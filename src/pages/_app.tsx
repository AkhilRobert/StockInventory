import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import NextNProgress from "nextjs-progressbar";
import "../../public/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextNProgress />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider zIndex={5000}>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default trpc.withTRPC(App);
