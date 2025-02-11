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
