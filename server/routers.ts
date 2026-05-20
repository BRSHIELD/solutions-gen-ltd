import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllCertificates, createCertificate, deleteCertificate } from "./db";
import { storagePut } from "./storage";
import { z } from "zod";

export const appRouter = router({
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
        issueDate: z.date().optional(),
        expiryDate: z.date().optional(),
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
            issueDate: input.issueDate,
            expiryDate: input.expiryDate,
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
