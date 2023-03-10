import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import superJSON from "superjson";

export const createContext = async (
  opts: CreateNextContextOptions
): Promise<{
  req: NextApiRequest;
  res: NextApiResponse;
  user: Pick<User, "id" | "role" | "username"> | undefined;
}> => {
  return {
    req: opts.req,
    res: opts.res,
    user: undefined,
  };
};

export type TContext = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<TContext>().create({
  transformer: superJSON,
});

export const router = t.router;

export const publicProcedure = t.procedure;
