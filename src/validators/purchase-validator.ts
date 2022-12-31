import { z } from "zod";

export const purchaseCreateValidation = z.object({
  receipt: z.date(),
  description: z.string().min(1),
  numbersReceived: z.number().gt(0),
  rate: z.number().gt(0),
  totalCost: z.number().gt(0),
  suppliter: z.string().min(1),
  warrantyPeriod: z.date(),
});
