import { z } from "zod";

export const loginInput = z.object({
  username: z.string().min(1, { message: "username cannot be empty" }),
  password: z.string().min(1, { message: "password cannot be empty" }),
});
