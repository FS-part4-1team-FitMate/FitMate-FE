import React, { useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserProvider";
import Chatting from "@/components/Chat/Chatting";
import { Message } from "@/types/chat";

interface MessageContainerProps {
  messageList: Message[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messageList }) => {
  const user = useUser();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  if (!user?.id) return null;

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messageList]);

  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-4">
      {messageList.map((message, index) => {
        const isMe = String(user.id) === String(message.senderId);

        return (
          <div key={index} ref={index === messageList.length - 1 ? lastMessageRef : null}>
            <Chatting
              nickname={message.senderNickname || "알 수 없음"}
              chatting={message.message}
              time={message.createdAt}
              isMe={isMe}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MessageContainer;
