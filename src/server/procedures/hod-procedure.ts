import { User, Role } from "@prisma/client";
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

  const user: Pick<User, "id" | "role"> = decodeJWT(token);

  if (user.role !== Role.HOD)
    throw new TRPCError({
      code: "FORBIDDEN",
    });

  return next({
    ctx: {
      user,
    },
  });
});

export const hodProcedure = t.procedure.use(isAuthenticated);
