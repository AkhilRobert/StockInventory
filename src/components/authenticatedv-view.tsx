import { ReactNode } from "react";
import { trpc } from "../utils/trpc";
import { OverlayBlur } from "./overlay-loading";

export const AuthenticatedView = ({ children }: { children: ReactNode }) => {
  const { isLoading } = trpc.auth.me.useQuery();

  if (isLoading) {
    return <OverlayBlur isLoading />;
  }

  return <>{children}</>;
};
