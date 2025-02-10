import { useEffect, useState } from "react";
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
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
  
    const user: User = { name: "User1" };
  
    useEffect(() => {
      const newSocket = io("http://localhost:3001");
      setSocket(newSocket);
  
      newSocket.on("receiveMessage", (msg: Message) => {
        setMessageList((prev) => [...prev, msg]);
      });
  
      return () => {
        newSocket.disconnect();
      };
    }, []);
  
    const sendMessage = (event: React.FormEvent) => {
      event.preventDefault();
      if (message.trim() === "" || !socket) return;
  
      const newMessage: Message = {
        _id: `${Date.now()}`,
        chat: message,
        user,
      };
  
      socket.emit("sendMessage", newMessage);
      setMessage("");
    };
  
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto p-4">
          <MessageContainer messageList={messageList} user={user} />
        </div>
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    );
  }