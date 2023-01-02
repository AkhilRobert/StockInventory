import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(App);
