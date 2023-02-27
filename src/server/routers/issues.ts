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
          purchaseId: input.id,
        },
      });
    }),

  getByID: staffProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.issue.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Purchase: true,
        },
      });
    }),

  condaminateIssue: staffProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input }) => {
      return prisma.issue.update({
        where: { id: input.id },
        data: {
          condaminated: true,
        },
      });
    }),
});
