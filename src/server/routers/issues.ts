import { z } from "zod";
import { prisma } from "../../utils/prisma";
import { staffProcedure } from "../procedures/staff-procedure";
import { router } from "../trpc";

export const issueRouter = router({
  list: staffProcedure.query(async () => {
    return prisma.issue.findMany({
      where: {
        Purchase: {
          hodAuthorized: true,
        },
      },
      include: {
        Purchase: true,
      },
    });
  }),

  getForPurchase: staffProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.issue.findMany({
        where: {
          id: input.id,
        },
      });
    }),
});
