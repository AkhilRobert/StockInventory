import { Issue, Purchase } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../utils/prisma";
import {
  entryValidator,
  purchaseCreateValidator,
  purchaseEditValidator,
} from "../../validators/purchase-validator";
import { hodProcedure } from "../procedures/hod-procedure";
import { staffProcedure } from "../procedures/staff-procedure";
import { superintendentProcedure } from "../procedures/superintendent-procedure";
import { publicProcedure, router } from "../trpc";

const createUniqueId = (
  purchase: Purchase,
  iteration: number,
  fundingAgency: string
): string => {
  const year = purchase.receiptDate.getFullYear();
  return `DIST/${fundingAgency}/${purchase.id}/${iteration}-${purchase.numbersReceived}/${year}`;
};

export const purchaseRouter = router({
  list: staffProcedure.query(() => {
    return prisma.purchase.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });
  }),

  create: staffProcedure
    .input(purchaseCreateValidator)
    .mutation(async ({ input }) => {
      const { fundingAgencyId, ...others } = input;
      const purchase = await prisma.purchase.create({
        data: {
          ...others,
          fundingAgencyId,
        },
      });

      const issues = new Array(purchase.numbersReceived)
        .fill({})
        .map((_, i) => {
          return {
            purchaseId: purchase.id,
            uniqueId: createUniqueId(purchase, i + 1, fundingAgencyId),
          } as Issue;
        });

      await prisma.issue.createMany({ data: issues });

      return {
        id: purchase.id,
      };
    }),

  update: superintendentProcedure
    .input(purchaseEditValidator)
    .mutation(async ({ input }) => {
      // Deleting all the issues
      await prisma.issue.deleteMany({
        where: {
          purchaseId: input.id,
        },
      });

      const purchase = await prisma.purchase.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });

      // Recreating all the issuses
      const issues = new Array(purchase.numbersReceived)
        .fill({})
        .map((_, i) => {
          return {
            purchaseId: purchase.id,
            uniqueId: createUniqueId(purchase, i + 1, purchase.fundingAgencyId),
          } as Issue;
        });

      await prisma.issue.createMany({ data: issues });

      return purchase;
    }),

  superintendentAuthorize: superintendentProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.purchase.update({
        where: {
          id: input.id,
        },
        data: {
          superintendentAuthorized: true,
          superintendentName: ctx.user.username,
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
    .mutation(async ({ input, ctx }) => {
      await prisma.purchase.update({
        where: {
          id: input.id,
        },
        data: {
          hodAuthorized: true,
          superintendentAuthorized: true,
          hodName: ctx.user.username,
          authorizedDate: new Date(Date.now()),
        },
      });

      return {
        message: "success",
      };
    }),

  getByID: staffProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.purchase.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getSuperintendentRequest: superintendentProcedure.query(() => {
    return prisma.purchase.findMany({
      where: {
        superintendentAuthorized: false,
      },
    });
  }),

  getHODRequests: hodProcedure.query(() => {
    return prisma.purchase.findMany({
      where: {
        superintendentAuthorized: true,
        hodAuthorized: false,
      },
    });
  }),

  entry: publicProcedure.input(entryValidator).mutation(async ({ input }) => {
    const { fundingAgencyId, id, ...others } = input;
    console.log(id);
    const purchase = await prisma.purchase.create({
      data: {
        id: id!,
        fundingAgencyId: fundingAgencyId!,
        hodAuthorized: true,
        superintendentAuthorized: true,
        description: others.description!,
        fundingAgency: others.fundingAgency!,
        invoiceNumber: others.invoiceNumber!,
        numbersReceived: others.numbersReceived!,
        rate: others.rate!,
        receiptDate: others.receiptDate!,
        supplierAddress: others.supplierAddress!,
        supplierName: others.supplierName!,
        taxPercentage: others.taxPercentage!,
        taxType: others.taxType!,
        totalCost: others.totalCost!,
        warrantyPeriod: others.warrantyPeriod!,
        authorizedDate: others.authorizedDate!,
        hodName: others.hodName!,
        superintendentName: others.superintendentName!,
      },
    });

    const issues = new Array(purchase.numbersReceived).fill({}).map((_, i) => {
      return {
        purchaseId: purchase.id,
        uniqueId: createUniqueId(purchase, i + 1, fundingAgencyId!),
      } as Issue;
    });

    await prisma.issue.createMany({ data: issues });

    return {
      id: purchase.id,
    };
  }),
});
