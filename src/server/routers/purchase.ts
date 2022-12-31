import { prisma } from "../../utils/prisma";
import { staffProcedure } from "../procedures/staff-procedure";
import { router } from "../trpc";

export const purchaseRouter = router({
  list: staffProcedure.query(() => {
    return prisma.purchase.findMany();
  }),
});
