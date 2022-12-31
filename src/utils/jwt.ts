import { createDecoder, createSigner, createVerifier } from "fast-jwt";

export const sign = (data: any): string => {
  const sign = createSigner({ key: process.env.SECRET });
  return sign(data);
};

export const decodeJWT = <T>(token: string): T => {
  const decoder = createDecoder();
  return decoder(token) as T;
};

export const validJWT = (token: string): boolean => {
  const verify = createVerifier({ key: process.env.SECRET });
  try {
    verify(token);
    return true;
  } catch (err: any) {
    return false;
  }
};
