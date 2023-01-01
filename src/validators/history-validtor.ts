import { z } from "zod";

export const historyCreateValidtor = z.object({
  floor: z.string().min(1),
  name: z.string().min(1),
  issueId: z.number(),
});
