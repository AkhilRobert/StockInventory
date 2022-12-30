import { loginInput } from "../../validators/auth-validtor";
import { privateProcedure, publicProcedure, router } from "../trpc";
import bcrypt from "bcrypt";
import { prisma } from "../../utils/prisma";
import { TRPCError } from "@trpc/server";
import { sign } from "../../utils/jwt";

export const authRouter = router({
  login: publicProcedure.input(loginInput).mutation(async ({ input, ctx }) => {
    const user = await prisma.user.findFirst({
      where: { username: input.username },
    });
    if (!user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    const token = sign({ id: user.id, role: user.role });

    // TODO: Check why session cookies are not working
    // Make the cookies secure on production
    // currently, Expiry time set as 8hrs
    ctx.res.setHeader("Set-Cookie", `sid=${token};HttpOnly;Max-Age=28800`);

    return {
      message: "logged in",
    };
  }),

  me: privateProcedure.query(({ ctx }) => {
    return { message: `Welcome ${ctx.user.id} ${ctx.user.role}` };
  }),
});
