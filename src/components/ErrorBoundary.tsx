import { UserProvider } from "@/contexts/UserProvider";
import ViewportProvider from "@/contexts/ViewportProvider";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GNB from "./GNB/GNB";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  client: QueryClient;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀할 수 있습니다.
      return (
        <>
          <QueryClientProvider client={this.props.client}>
            <UserProvider>
              <ViewportProvider>
                <GNB />
                <h1 className="text-xl text-center">Something went wrong.</h1>
              </ViewportProvider>
            </UserProvider>
          </QueryClientProvider>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
