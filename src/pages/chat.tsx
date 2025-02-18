import { useEffect, useState } from "react";
import { getChatRooms, getChatMessages, sendMessage } from "@/lib/api/chatService";
import ChatList from "@/components/Chat/ChatList";
import ChatRoom from "@/components/Chat/ChatRoom";
import socket from "@/lib/utils/socket";
import { ChatRoomType, Message } from "@/types/chat";
import { useUser } from "@/contexts/UserProvider";

export default function Chat() {
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const user = useUser();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const rooms = await getChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패:", error);
      }
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!selectedRoom) return;

    async function fetchMessages() {
      try {
        if (!selectedRoom?.roomId) return;

        const messages = await getChatMessages(selectedRoom.roomId, 1, 50);
        const formattedMessages = messages.map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt).toLocaleTimeString(),
        }));

        setMessageList(formattedMessages);
      } catch (error) {
        console.error("메시지 불러오기 실패:", error);
      }
    }

    fetchMessages();

    socket.emit("joinRoom", selectedRoom.roomId);

    socket.on("receiveMessage", (msg: Message) => {
      console.log("받은 메시지:", msg);
      setMessageList((prev) => [
        ...prev,
        { ...msg, createdAt: new Date(msg.createdAt).toLocaleTimeString() },
      ]);
    });

    return () => {
      socket.emit("leaveRoom", selectedRoom.roomId);
      socket.off("receiveMessage");
    };
  }, [selectedRoom]);

  const handleSendMessage = async (message: string) => {
    if (!selectedRoom || !user) return;

    const newMessage: Message = {
      roomId: selectedRoom.roomId,
      senderId: user.id,
      receiverId: selectedRoom.participant2,
      message,
      createdAt: new Date().toISOString(),
    };

    setMessageList((prev) => [...prev, { ...newMessage, createdAt: new Date().toLocaleTimeString() }]);

    socket.emit("sendMessage", newMessage);
    try {
      await sendMessage(selectedRoom.roomId, selectedRoom.participant2, message);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <ChatList chatRooms={chatRooms} selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
      <ChatRoom selectedRoom={selectedRoom} messageList={messageList} onSendMessage={handleSendMessage} />
    </div>
  );
}
