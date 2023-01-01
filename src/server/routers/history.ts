import { prisma } from "../../utils/prisma";
import { staffProcedure } from "../procedures/staff-procedure";
import { router } from "../trpc";
import { z } from "zod";

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
});
