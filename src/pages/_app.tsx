import { UserProvider } from "@/contexts/UserProvider";
import ViewportProvider from "@/contexts/ViewportProvider";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GNB from "@/components/GNB/GNB";
import Tab from "@/components/Tab";
import "@/styles/globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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

  const isActiveTab =
    router.pathname === "/user/my-lesson/pending-request" ||
    router.pathname === "/user/my-lesson/active-lesson" ||
    router.pathname === "/user/my-lesson/past-lesson" ||
    router.pathname === "/user/lesson-review/awaiting-review" ||
    router.pathname === "/user/lesson-review/written-review" ||
    router.pathname === "/trainer/managing-request/sent-request" ||
    router.pathname === "/trainer/managing-request/rejected-request";

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="핏메이트" />
        <meta
          property="og:description"
          content="맞춤형 트레이닝 서비스, 핏메이트와 함께 해보세요!"
        />
        <meta property="og:image" content="https://i.imgur.com/eFR67w5.png" />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ViewportProvider>
            <div className={pretendard.className}>
              <ToastContainer />
              <GNB />
              {isActiveTab && <Tab />}
              <Component {...pageProps} />
            </div>
          </ViewportProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}
