-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HOD', 'SUPERINTENDENT', 'STAFF');

-- CreateEnum
CREATE TYPE "TaxType" AS ENUM ('VAT', 'GST');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "receiptDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "numbersReceived" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "supplier" TEXT NOT NULL,
    "warrantyPeriod" TEXT NOT NULL,
    "taxType" "TaxType" NOT NULL,
    "hodAuthorized" BOOLEAN NOT NULL DEFAULT false,
    "superintendentAuthorized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "condaminated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "issueId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
