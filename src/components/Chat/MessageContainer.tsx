import React from "react";
import Chatting from "@/components/Chat/Chatting";
import { useUser } from "@/contexts/UserProvider";

interface Message {
  senderId: string;
  senderNickname: string;
  senderProfileImage: string | null;
  message: string;
  createdAt: string;
}

interface MessageContainerProps {
  messageList: Message[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messageList }) => {
  const user = useUser();

  return (
    <div className="space-y-2">
      {messageList.map((message, index) => {
        const formattedTime = message.createdAt
          ? new Date(message.createdAt).toLocaleTimeString()
          : "알 수 없음";
        return (
          <Chatting
            key={index}
            nickname={message.senderNickname || "알 수 없음"}
            chatting={message.message}
            time={formattedTime}
            isMe={message.senderId === user?.id}
          />
        );
      })}
    </div>
  );
};

export default MessageContainer;
