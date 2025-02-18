export interface ChatRoom {
  roomId: string;
  participant?: string;
  MyId?: string;
}

export interface ChatRoomType {
    roomId: string;
    participant1?: string;
    participant2?: string;
    participant?: string;
    MyId?: string;
    isMe?: boolean;
  }

export interface Message {
    senderId: string;
    senderNickname?: string;
    senderProfileImage?: string | null;
    message: string;
    createdAt: string;
  }

export interface MessageType {
  roomId: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}