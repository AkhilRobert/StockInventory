import { authRouter } from "./routers/auth";
import { purchaseRouter } from "./routers/purchase";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  purchase: purchaseRouter,
});

export type AppRouter = typeof appRouter;
