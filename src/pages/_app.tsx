import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default trpc.withTRPC(App);
