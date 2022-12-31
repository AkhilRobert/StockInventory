/*
  Warnings:

  - Added the required column `invoiceNumber` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxPercentage` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "invoiceNumber" INTEGER NOT NULL,
ADD COLUMN     "taxPercentage" INTEGER NOT NULL;
