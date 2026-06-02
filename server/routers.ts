import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllCertificates, createCertificate, deleteCertificate, createContactSubmission } from "./db";
import { storagePut } from "./storage";
import { z } from "zod";

export const appRouter = router({
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2).max(50),
        email: z.string().email(),
        phone: z.string().optional(),
        service: z.string(),
        message: z.string().min(10).max(1000),
        timestamp: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          // Save contact submission to database
          await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            service: input.service,
            message: input.message,
            status: 'new',
          });

          console.log('Contact form submission saved:', input);
          
          // TODO: Send email notification to owner using notifyOwner helper
          // await notifyOwner({
          //   title: 'New Contact Form Submission',
          //   content: `New message from ${input.name} (${input.email}): ${input.message}`,
          // });

          return {
            success: true,
            message: 'Thank you for your message. We will get back to you soon.',
          };
        } catch (error) {
          console.error('Contact form submission error:', error);
          throw new Error('Failed to submit contact form');
        }
      }),
  }),

  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  certificates: router({
    list: publicProcedure.query(async () => {
      return await getAllCertificates();
    }),
    upload: protectedProcedure
      .input(z.object({
        title: z.string(),
        issuer: z.string(),
        category: z.string(),
        fileBuffer: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can upload certificates');
        }

        try {
          const buffer = Buffer.from(input.fileBuffer, 'base64');
          const fileKey = `certificates/${input.category}/${Date.now()}-${input.title}.pdf`;
          const { url } = await storagePut(fileKey, buffer, 'application/pdf');
          
          await createCertificate({
            title: input.title,
            issuer: input.issuer,
            category: input.category,
            fileKey,
            fileUrl: url,
            isActive: 1,
          });
          
          return { success: true, url };
        } catch (error) {
          console.error('Certificate upload failed:', error);
          throw new Error('Failed to upload certificate');
        }
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can delete certificates');
        }
        
        return await deleteCertificate(input.id);
      }),
    batchUpload: protectedProcedure
      .input(z.object({
        certificates: z.array(z.object({
          title: z.string(),
          issuer: z.string(),
          category: z.string(),
          issueDate: z.string().optional(),
          expiryDate: z.string().optional(),
          fileBuffer: z.string(),
        })),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can upload certificates');
        }

        const results = {
          successful: 0,
          failed: 0,
          errors: [] as string[],
        };

        for (const cert of input.certificates) {
          try {
            const buffer = Buffer.from(cert.fileBuffer, 'base64');
            const fileKey = `certificates/${cert.category}/${Date.now()}-${cert.title}.pdf`;
            const { url } = await storagePut(fileKey, buffer, 'application/pdf');
            
            await createCertificate({
              title: cert.title,
              issuer: cert.issuer,
              category: cert.category,
              fileKey,
              fileUrl: url,
              issueDate: cert.issueDate ? new Date(cert.issueDate) : undefined,
              expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : undefined,
              isActive: 1,
            });
            
            results.successful++;
          } catch (error) {
            results.failed++;
            results.errors.push(`Failed to upload ${cert.title}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }

        return results;
      }),
  }),
});

export type AppRouter = typeof appRouter;
