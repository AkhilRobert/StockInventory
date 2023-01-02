import type { Issue, Purchase } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../utils/prisma";
import { purchaseCreateValidator } from "../../validators/purchase-validator";
import { hodProcedure } from "../procedures/hod-procedure";
import { staffProcedure } from "../procedures/staff-procedure";
import { superintendentProcedure } from "../procedures/superintendent-procedure";
import { router } from "../trpc";

const createUniqueId = (purchase: Purchase, iteration: number): string => {
  const year = purchase.receiptDate.getFullYear();
  return `DIST/${purchase.supplier}/${purchase.id}/${iteration}-${purchase.numbersReceived}/${year}`;
};

export const purchaseRouter = router({
  list: staffProcedure.query(() => {
    return prisma.purchase.findMany();
  }),

  create: staffProcedure
    .input(purchaseCreateValidator)
    .mutation(async ({ input }) => {
      const purchase = await prisma.purchase.create({
        data: input,
      });

      const issues = new Array(purchase.numbersReceived)
        .fill({})
        .map((_, i) => {
          return {
            purchaseId: purchase.id,
            uniqueId: createUniqueId(purchase, i + 1),
          } as Issue;
        });

      await prisma.issue.createMany({ data: issues });

      return {
        message: "success",
      };
    }),

  superintendentAuthorize: superintendentProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.purchase.update({
        where: {
          id: input.id,
        },
        data: {
          superintendentAuthorized: true,
        },
      });

      return {
        message: "success",
      };
    }),

  HODAuthorize: hodProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.purchase.update({
        where: {
          id: input.id,
        },
        data: {
          hodAuthorized: true,
        },
      });

      return {
        message: "success",
      };
    }),
});
