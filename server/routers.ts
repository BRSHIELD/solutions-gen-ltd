import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { createContactSubmission } from "./db";
import { storagePut, storageGetSignedUrl } from "./storage";
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


});

export type AppRouter = typeof appRouter;
