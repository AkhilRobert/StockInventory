import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.user.create({
      data: {
        username: "hod",
        role: Role.HOD,
        password: await bcrypt.hash("hod", 12),
      },
    }),

    prisma.user.create({
      data: {
        username: "office",
        role: Role.STAFF,
        password: await bcrypt.hash("office", 12),
      },
    }),

    prisma.user.create({
      data: {
        username: "superintendent",
        role: Role.SUPERINTENDENT,
        password: await bcrypt.hash("superintendent", 12),
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export { };
