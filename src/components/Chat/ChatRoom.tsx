import InputField from "@/components/Chat/InputField";
import MessageContainer from "@/components/Chat/MessageContainer";
import { img_non_review_md } from "@/imageExports";
import Image from "next/image";
import { useState } from "react";

interface ChatRoomProps {
  selectedRoom: { roomId: string; participant1: string; participant2: string } | null;
  messageList: {
    senderId: string;
    senderNickname: string;
    senderProfileImage: string | null;
    message: string;
    createdAt: string;
  }[];
  onSendMessage: (message: string) => void;
}

export default function ChatRoom({ selectedRoom, messageList, onSendMessage }: ChatRoomProps) {
  const [message, setMessage] = useState("");

  if (!selectedRoom) {
    return (
        <div className="w-3/4 flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem] ">
          <Image src={img_non_review_md} alt="non-request" />
          <h1 className="text-gray-400 text-lg font-regular">메시지를 보내보세요!</h1>
        </div>
      );
  }

  return (
    <div className="w-3/4 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-xl font-bold">{selectedRoom.participant2}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <MessageContainer messageList={messageList} />
      </div>
      <div className="p-4 border-t border-gray-300">
        <InputField message={message} setMessage={setMessage} sendMessage={() => onSendMessage(message)} />
      </div>
    </div>
  );
}