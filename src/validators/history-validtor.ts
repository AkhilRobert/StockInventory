import { z } from "zod";

export const historyCreateValidtor = z.object({
  floor: z.string().min(1, { message: "floor cannot be empty" }),
  name: z.string().min(1, { message: "Name cannot be empty" }),
  issueId: z.number(),
});
