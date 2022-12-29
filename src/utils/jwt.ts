import { createSigner } from "fast-jwt";

export const sign = (data: any): string => {
  const sign = createSigner({ key: process.env.SECRET });
  return sign(data);
};
