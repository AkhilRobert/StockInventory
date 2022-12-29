import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      username: "hod",
      role: Role.HOD,
      password: await bcrypt.hash("hod", 12),
    },
  });
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
