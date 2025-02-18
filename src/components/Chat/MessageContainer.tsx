import { useUser } from "@/contexts/UserProvider";
import Chatting from "@/components/Chat/Chatting";
import { Message } from "@/types/chat";

interface MessageContainerProps {
  messageList: Message[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messageList }) => {
  const user = useUser();

  if (!user?.id) return null;

  return (
    <div className="space-y-2">
      {messageList.map((message, index) => {
        const isMe = String(user.id) === String(message.senderId);

        return (
          <Chatting
            key={index}
            nickname={message.senderNickname || "알 수 없음"}
            chatting={message.message}
            time={message.createdAt}
            isMe={isMe}
          />
        );
      })}
    </div>
  );
};

export default MessageContainer;