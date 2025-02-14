import React from "react";
import Chatting from "@/components/Chat/Chatting";

interface User {
  name: string;
}

interface Message {
  _id: string;
  chat: string;
  user: User;
  time?: string;
}

interface MessageContainerProps {
  messageList: Message[];
  user: User;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messageList, user }) => {
  return (
    <div className="space-y-2">
      {messageList.map((message) => (
        <Chatting
          key={message._id}
          nickname={message.user.name}
          chatting={message.chat}
          time={message.time || new Date().toLocaleTimeString()}
          isMe={message.user.name === user.name}
        />
      ))}
    </div>
  );
};

export default MessageContainer;