import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

const createContext = async (opts: CreateNextContextOptions) => {
  return {
    req: opts.req,
    res: opts.res,
  };
};

export type TContext = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<TContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
