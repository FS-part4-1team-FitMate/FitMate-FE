import { NotificationProvider } from "@/contexts/NotificationProvider";
import { UserProvider } from "@/contexts/UserProvider";
import ViewportProvider from "@/contexts/ViewportProvider";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoleGuard from "@/lib/utils/RoleGuard";
import PopUp, { CustomError } from "@/components/Common/PopUp";
import ErrorBoundary from "@/components/ErrorBoundary";
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
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<CustomError>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  const isActiveTab =
    router.pathname === "/user/my-lesson/pending-request" ||
    router.pathname === "/user/my-lesson/active-lesson" ||
    router.pathname === "/user/my-lesson/past-lesson" ||
    router.pathname === "/user/my-lesson/lesson-history" ||
    router.pathname === "/user/lesson-review/awaiting-review" ||
    router.pathname === "/user/lesson-review/written-review" ||
    router.pathname === "/trainer/managing-request/sent-request" ||
    router.pathname === "/trainer/managing-request/rejected-request";

  return (
    <>
      <Head>
        <title>핏메이트 - 맞춤형 트레이닝 서비스</title>
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
        <ErrorBoundary client={queryClient} error={error} setError={setError}>
          <UserProvider>
            <NotificationProvider>
              <ViewportProvider>
                <div className={pretendard.className}>
                  {isClient && (
                    <Toaster
                      position="top-center"
                      toastOptions={{
                        style: {
                          maxWidth: "100%",
                          fontSize: "1.6rem",
                        },
                        duration: 3000,
                      }}
                    />
                  )}
                  {router.pathname !== "/" && <GNB />}
                  {isActiveTab && <Tab />}
                  <RoleGuard />
                  <Component {...pageProps} />
                  <PopUp error={error} setError={setError} onlyCancel={true} />
                </div>
              </ViewportProvider>
            </NotificationProvider>
          </UserProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}
