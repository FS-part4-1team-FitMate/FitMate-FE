import { useRouter } from "next/router";

export default function ChatRooms() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">채팅방 목록</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {chatRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => router.push(`/chat/${room.id}`)}
            className="block w-full p-3 bg-blue-500 text-white rounded-lg my-2 text-center"
          >
            {room.name}
          </button>
        ))}
      </div>
    </div>
  );
}
