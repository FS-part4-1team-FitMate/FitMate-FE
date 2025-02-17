import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import socket from "@/lib/utils/socket";
import InputField from "@/components/Chat/InputField";
import MessageContainer from "@/components/Chat/MessageContainer";

interface User {
  name: string;
}

interface Message {
  _id: string;
  chat: string;
  user: User;
  time?: string;
}

export default function ChatRoom() {
  const router = useRouter();
  const { roomId } = router.query;
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  const user: User = { name: "User1" };

  useEffect(() => {
    if (!roomId) return;

    // 방 입장
    socket.emit("joinRoom", roomId);

    // 🔍 `receiveMessage` 이벤트 발생 시 로그 확인
    socket.on("receiveMessage", (msg: Message) => {
      console.log("📩 메시지 수신:", msg);
      setMessageList((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      _id: `${Date.now()}`,
      chat: message,
      user,
      time: new Date().toLocaleTimeString(),
      roomId,
    };

    console.log("📤 메시지 전송:", newMessage);
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4">채팅방 {roomId}</h2>
        <MessageContainer messageList={messageList} user={user} />
      </div>
      <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
}