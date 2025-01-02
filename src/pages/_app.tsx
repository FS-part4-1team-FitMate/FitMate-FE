import type { AppProps } from "next/app";
import localFont from "next/font/local";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import { UserProvider } from "@/contexts/UserProvider";
import GNB from "@/components/GNB";
import ViewportProvider from "@/contexts/ViewportProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 보통 SSR에서는 staleTime을 0 이상으로 해줌으로써
            // 클라이언트 사이드에서 바로 다시 데이터를 refetch 하는 것을 피한다.
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider><ViewportProvider>
        <div className={pretendard.className}>
          <GNB />
          <Component {...pageProps} />
        </div>
      </ViewportProvider></UserProvider>
    </QueryClientProvider>
  );
}
