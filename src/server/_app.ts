import { authRouter } from "./routers/auth";
import { historyRouter } from "./routers/history";
import { issueRouter } from "./routers/issues";
import { purchaseRouter } from "./routers/purchase";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  purchase: purchaseRouter,
  issue: issueRouter,
  history: historyRouter,
});

export type AppRouter = typeof appRouter;
