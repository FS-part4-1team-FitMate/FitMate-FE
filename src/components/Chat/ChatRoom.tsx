import InputField from "@/components/Chat/InputField";
import MessageContainer from "@/components/Chat/MessageContainer";
import { remove } from "@/lib/api/method";
import { img_non_review_md } from "@/imageExports";
import Image from "next/image";
import { useState } from "react";
import { ChatRoomType } from "@/types/chat";

interface ChatRoomProps {
  selectedRoom: ChatRoomType | null;
  messageList: {
    senderId: string;
    senderNickname?: string;
    senderProfileImage?: string | null;
    message: string;
    createdAt: string;
  }[];
  onSendMessage: (message: string) => void;
  onLeaveRoom: () => void;
}

export default function ChatRoom({ selectedRoom, messageList, onSendMessage, onLeaveRoom }: ChatRoomProps) {
  const [message, setMessage] = useState("");

  console.log("selectedRoom", selectedRoom)

  const handleLeaveRoom = async () => {
    if (!selectedRoom) return;

    try {
      await remove(`/chat/leave/${selectedRoom.roomId}`);
      onLeaveRoom();
    } catch (error) {
      console.error("🚨 채팅방 나가기 실패:", error);
    }
  };

  if (!selectedRoom) {
    return (
      <div className="w-3/4 flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
        <Image src={img_non_review_md} alt="non-request" width={200} height={200} />
        <h1 className="text-gray-400 text-lg font-regular">메시지를 보내보세요!</h1>
      </div>
    );
  }

  return (
    <div className="w-3/4 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-300 flex justify-between items-center">
        <h2 className="text-xl font-bold">{selectedRoom.participant}</h2>
        <button onClick={handleLeaveRoom} className="px-4 py-2 bg-red-500 text-white rounded-lg">
          채팅방 나가기
        </button>
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
