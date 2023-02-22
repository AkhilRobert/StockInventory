import { z } from "zod";
import { TaxType } from "@prisma/client";

export const purchaseCreateValidator = z.object({
  receiptDate: z.date(),
  description: z.string().min(1, {
    message: "Description cannot be empty",
  }),
  numbersReceived: z.number().gt(0),
  rate: z.number().gt(0),
  totalCost: z
    .number({ invalid_type_error: "Total cost cannot be empty" })
    .gt(0),
  taxPercentage: z
    .number({ invalid_type_error: "Tax percentage cannot be empty" })
    .gt(0),
  taxType: z.nativeEnum(TaxType),
  supplierName: z.string().min(1, {
    message: "Supplier Name cannot be empty",
  }),
  supplierAddress: z.string().min(1, {
    message: "Supplier Address cannot be empty",
  }),
  warrantyPeriod: z.date(),
  invoiceNumber: z.string().min(1, {
    message: "Invoice number cannot be empty",
  }),
  fundingAgency: z.string().min(1, {
    message: "Funding Agency cannot be empty",
  }),
  fundingAgencyId: z.string().min(1, {
    message: "Funding Agency Id cannot be empty",
  }),
});

export const purchaseEditValidator = z.object({
  id: z.number().gt(0),
  receiptDate: z.date(),
  description: z.string().min(1, {
    message: "Description cannot be empty",
  }),
  numbersReceived: z.number().gt(0),
  rate: z.number().gt(0),
  totalCost: z
    .number({ invalid_type_error: "Total cost cannot be empty" })
    .gt(0),
  taxPercentage: z
    .number({ invalid_type_error: "Tax percentage cannot be empty" })
    .gt(0),
  taxType: z.nativeEnum(TaxType),
  supplierName: z.string().min(1, {
    message: "Supplier Name cannot be empty",
  }),
  supplierAddress: z.string().min(1, {
    message: "Supplier Address cannot be empty",
  }),
  warrantyPeriod: z.date(),
  invoiceNumber: z.string(),
  fundingAgency: z.string().min(1, {
    message: "Funding Agency cannot be empty",
  }),
  fundingAgencyId: z.string().min(1, {
    message: "Funding Agency Id cannot be empty",
  }),
});

export const entryValidator = z.object({
  receiptDate: z.date().nullish(),
  description: z
    .string()
    .min(1, {
      message: "Description cannot be empty",
    })
    .nullish(),
  numbersReceived: z.number().gt(0).nullish(),
  rate: z.number().gt(0).nullish(),
  totalCost: z
    .number({ invalid_type_error: "Total cost cannot be empty" })
    .gt(0)
    .nullish(),
  taxPercentage: z
    .number({ invalid_type_error: "Tax percentage cannot be empty" })
    .gt(0)
    .nullish(),
  taxType: z.nativeEnum(TaxType).nullish(),
  supplierName: z
    .string()
    .min(1, {
      message: "Supplier Name cannot be empty",
    })
    .nullish(),
  supplierAddress: z
    .string()
    .min(1, {
      message: "Supplier Address cannot be empty",
    })
    .nullish(),
  warrantyPeriod: z.date().nullish(),
  invoiceNumber: z
    .string()
    .min(1, {
      message: "Invoice number cannot be empty",
    })
    .nullish(),
  fundingAgency: z
    .string()
    .min(1, {
      message: "Funding Agency cannot be empty",
    })
    .nullish(),
  fundingAgencyId: z
    .string()
    .min(1, {
      message: "Funding Agency Id cannot be empty",
    })
    .nullish(),
  hodName: z
    .string()
    .min(1, {
      message: "HOD name cannot be empty",
    })
    .nullish(),
  superintendentName: z.string().nullish(),
  authorizedDate: z.date().nullish(),
});
