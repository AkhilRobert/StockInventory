import { z } from "zod";
import { TaxType } from "@prisma/client";

export const purchaseCreateValidator = z.object({
  receiptDate: z.date(),
  description: z.string().min(1),
  numbersReceived: z.number().gt(0),
  rate: z.number().gt(0),
  totalCost: z.number().gt(0),
  taxPercentage: z.number().min(0),
  taxType: z.nativeEnum(TaxType),
  supplierName: z.string().min(1),
  supplierAddress: z.string().min(1),
  warrantyPeriod: z.date(),
  invoiceNumber: z.string(),
  fundingAgency: z.string().min(1),
});
