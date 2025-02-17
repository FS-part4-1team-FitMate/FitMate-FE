import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getChatRooms } from "@/lib/api/chatService";

interface ChatRoom {
  id: string;
  name: string;
}

export default function ChatRooms() {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const rooms = await getChatRooms();
        console.log("데이터", rooms)
        setChatRooms(rooms);
      } catch (error) {
        console.error("🚨 채팅방 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-6 bg-blue-50">
      <h1 className="text-2xl font-bold mb-4">FITCHAT</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : chatRooms.length === 0 ? (
          <p className="text-center text-gray-500">채팅방이 없습니다.</p>
        ) : (
          chatRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => router.push(`/chat/${room.id}`)}
              className="block w-full p-3 bg-blue-500 text-white rounded-lg my-2 text-center"
            >
              {room.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}