import "dotenv/config";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";

// 알림 데이터 타입 정의
interface Notification {
  id: number;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
}

// 초기값 설정
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const user = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 새 알림 추가
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  // 모든 알림 초기화
  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    let retryCount = 0;
    let eventSource: EventSource | null = null;
    const maxRetries = 5; // 최대 재연결 시도 횟수

    const connectSSE = () => {
      const userId = user?.id;
      if (!userId) {
        console.error("user_id가 없습니다. SSE 연결이 불가능합니다.");
        return;
      }

      eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/sse?user_id=${userId}`,
      );

      console.log("SSE 연결 시도...");

      eventSource.onopen = () => {
        console.log("SSE 연결 성공");
        retryCount = 0; // 성공하면 재연결 횟수 초기화
      };

      eventSource.onmessage = (event) => {
        console.log("수신된 원본 메시지:\n", event.data);
        try {
          const newNotification: Notification = JSON.parse(event.data);
          addNotification(newNotification);
        } catch (err) {
          console.error("알림 데이터 파싱 오류:", err);
        }
      };

      eventSource.onerror = () => {
        console.error(`SSE 연결 오류. 재시도 횟수: ${retryCount}`);
        eventSource?.close();

        if (retryCount < maxRetries) {
          const retryDelay = Math.min(1000 * 2 ** retryCount, 30000); // 지수 백오프 (최대 30초)
          console.log(`${retryDelay / 1000}초 후 재연결 시도...`);
          setTimeout(connectSSE, retryDelay);
          retryCount++;
        } else {
          console.error("최대 재연결 시도 횟수를 초과했습니다.");
        }
      };
    };

    connectSSE();

    return () => {
      console.log("SSE 연결 종료");
      eventSource?.close();
    };
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// NotificationContext를 사용하는 커스텀 훅
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications는 반드시 NotificationProvider 안에서 사용해야 합니다.");
  }
  return context;
};
