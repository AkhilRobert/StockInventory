import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") prisma = new PrismaClient();
else {
  if (!global.db) {
    global.db = new PrismaClient({
      log: ["query"],
    });
  }
  prisma = global.db;
}

export { prisma };
