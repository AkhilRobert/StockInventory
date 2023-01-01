import { prisma } from "../../utils/prisma";
import { staffProcedure } from "../procedures/staff-procedure";
import { router } from "../trpc";
import { z } from "zod";
import { superintendentProcedure } from "../procedures/superintendent-procedure";
import { historyCreateValidtor } from "../../validators/history-validtor";

export const historyRouter = router({
  list: staffProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      return prisma.history.findMany({
        where: {
          issueId: input.id,
        },
      });
    }),

  create: superintendentProcedure
    .input(historyCreateValidtor)
    .mutation(async ({ input }) => {
      await prisma.history.create({
        data: input,
      });
      return {
        message: "success",
      };
    }),
});
