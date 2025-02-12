export interface NotiParams {
  page?: number;
  limit?: number;
  order?: "created_at" | "price";
  sort?: "asc" | "desc";
}

// 알림 데이터 타입 정의
export interface Notification {
  id: number;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotiResult {
  list: Notification[];
  totalCount: number;
  hasMore: boolean;
}

export enum NotificationType {
  CHAT_MESSAGE = "CHAT_MESSAGE",
  LESSON_QUOTE = "LESSON_QUOTE",
}

export const notificationType_trans = {
  [NotificationType.CHAT_MESSAGE]: "메시지",
  [NotificationType.LESSON_QUOTE]: "견적",
};
