import { ic_profile_default_md, img_non_review_md } from "@/imageExports";
import { ChatRoomType } from "@/types/chat";
import Image from "next/image";

interface ChatListProps {
    chatRooms: ChatRoomType[];
    selectedRoom: { roomId?: string } | null;
    onSelectRoom: (room: ChatRoomType) => void;
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
              className={`flex items-center w-full p-8 gap-5 text-lg ${
                selectedRoom?.roomId === room.roomId ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <Image
                src={ic_profile_default_md}
                alt="트레이너 프로필"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1>{room.participantName}</h1>
            </button>
          ))
        )}
      </div>
    );
  }