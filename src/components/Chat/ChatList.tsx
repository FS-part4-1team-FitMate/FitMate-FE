import { img_non_review_md } from "@/imageExports";
import Image from "next/image";

interface ChatListProps {
    chatRooms: { roomId: string; participant1: string; participant2: string }[];
    selectedRoom: { roomId: string } | null;
    onSelectRoom: (room: { roomId: string; participant1: string; participant2: string }) => void;
  }
  
  export default function ChatList({ chatRooms, selectedRoom, onSelectRoom }: ChatListProps) {
    return (
      <div className="w-1/4 border-r border-gray-300 overflow-y-auto">
        <h2 className="text-xl font-bold p-4">채팅 목록</h2>
        {chatRooms.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
          <Image src={img_non_review_md} alt="non-request" />
          <h1 className="text-gray-400 text-lg font-regular">채팅방을 생성해주세요!</h1>
        </div>
      ) : (
          chatRooms.map((room) => (
            <button
              key={room.roomId}
              onClick={() => onSelectRoom(room)}
              className={`w-full p-3 text-left ${
                selectedRoom?.roomId === room.roomId ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {room.participant2}
            </button>
          ))
        )}
      </div>
    );
  }