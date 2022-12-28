import { z } from 'zod';
import { procedure, router } from './trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text} Welcome to the app`,
      };
    }),
});

export type AppRouter = typeof appRouter;
