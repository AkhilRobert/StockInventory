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

const t = initTRPC.context<TContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

// TODO: Move this to role based auth
const isAuthenticated = t.middleware(({ next, ctx }) => {
  const token = ctx.req.cookies["sid"];
  if (!token)
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  const result = validJWT(token);
  if (result)
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  // TODO: Make the data to get from the token
  const user: Pick<User, "id" | "role"> = {
    id: 1,
    role: Role.HOD,
  };

  return next({
    ctx: {
      user,
    },
  });
});

export const privateProcedure = t.procedure.use(isAuthenticated);
