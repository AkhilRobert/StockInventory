import { authRouter } from "./routers/auth";
import { issueRouter } from "./routers/issues";
import { purchaseRouter } from "./routers/purchase";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  purchase: purchaseRouter,
  issue: issueRouter,
});

export type AppRouter = typeof appRouter;
