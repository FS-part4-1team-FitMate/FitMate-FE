import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import InputField from "@/components/Chat/InputField";
import MessageContainer from "@/components/Chat/MessageContainer";

interface User {
  name: string;
}

interface Message {
  _id: string;
  chat: string;
  user: User;
}

export default function Chat() {
  const router = useRouter();
  const { roomId } = router.query;
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const user: User = { name: "User1" };

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.emit("joinRoom", roomId);

    newSocket.on("receiveMessage", (msg: Message) => {
      setMessageList((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.emit("leaveRoom", roomId);
      newSocket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "" || !socket) return;

    const newMessage: Message = {
      _id: `${Date.now()}`,
      chat: message,
      user,
    };

    socket.emit("sendMessage", { ...newMessage, roomId });
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