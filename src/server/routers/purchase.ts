import type { Issue, Purchase } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import { purchaseCreateValidator } from "../../validators/purchase-validator";
import { staffProcedure } from "../procedures/staff-procedure";
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
});
