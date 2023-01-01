import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  Promise.all([
    prisma.user.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        username: "hod",
        role: Role.HOD,
        password: await bcrypt.hash("hod", 12),
      },
    }),

    prisma.user.upsert({
      where: {
        id: 2,
      },
      update: {},
      create: {
        username: "staff",
        role: Role.STAFF,
        password: await bcrypt.hash("staff", 12),
      },
    }),

    prisma.user.upsert({
      where: {
        id: 3,
      },
      update: {},
      create: {
        username: "sup",
        role: Role.SUPERINTENDENT,
        password: await bcrypt.hash("sup", 12),
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
