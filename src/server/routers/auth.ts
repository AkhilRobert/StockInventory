import { loginInput } from "../../validators/auth-validtor";
import { procedure, router } from "../trpc";
import bcrypt from "bcrypt";
import { prisma } from "../../utils/prisma";
import { TRPCError } from "@trpc/server";
import { sign } from "../../utils/jwt";
import { randomInt } from "crypto";

export const authRouter = router({
  login: procedure.input(loginInput).mutation(async ({ input, ctx }) => {
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

    const token = sign({ id: user.id });

    ctx.res.setHeader("Set-Cookie", `token=${token};HttpOnly`);

    return {
      message: token,
    };
  }),
});
