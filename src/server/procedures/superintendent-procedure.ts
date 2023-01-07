import { Role, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { validJWT, decodeJWT } from "../../utils/jwt";
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

  if (user.role === Role.STAFF)
    throw new TRPCError({
      code: "FORBIDDEN",
    });

  return next({
    ctx: {
      user,
    },
  });
});

export const superintendentProcedure = t.procedure.use(isAuthenticated);
