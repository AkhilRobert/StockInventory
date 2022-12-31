import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { validJWT } from "../utils/jwt";
import { Role, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const createContext = async (
  opts: CreateNextContextOptions
): Promise<{
  req: NextApiRequest;
  res: NextApiResponse;
  user: Pick<User, "id" | "role"> | undefined;
}> => {
  return {
    req: opts.req,
    res: opts.res,
    user: undefined,
  };
};

export type TContext = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<TContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;
