import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { decodeJWT, validJWT } from "../../utils/jwt";
import { t } from "../trpc";

const isAuthenticated = t.middleware(({ next, ctx }) => {
  const token = ctx.req.cookies["sid"];
  if (!token)
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  const result = validJWT(token);
  if (!result)
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  const user: Pick<User, "id" | "role" | "username"> = decodeJWT(token);

  return next({
    ctx: {
      user,
    },
  });
});

export const staffProcedure = t.procedure.use(isAuthenticated);
