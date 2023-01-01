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
});
