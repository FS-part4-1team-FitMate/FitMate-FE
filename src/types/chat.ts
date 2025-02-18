export interface ChatRoomType {
    roomId: string;
    participant1: string;
    participant2: string;
  }

export interface Message {
    senderId: string;
    senderNickname: string;
    senderProfileImage: string | null;
    message: string;
    createdAt: string;
  }