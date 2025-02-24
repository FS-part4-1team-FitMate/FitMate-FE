import { useEffect, useState } from "react";
import { getChatRooms, getChatMessages, sendMessage, leaveChatRoom } from "@/lib/api/chatService";
import ChatList from "@/components/Chat/ChatList";
import ChatRoom from "@/components/Chat/ChatRoom";
import socket from "@/lib/utils/socket";
import { ChatRoomType, Message } from "@/types/chat";
import { useUser } from "@/contexts/UserProvider";
import toast from "react-hot-toast";

export default function Chat() {
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const user = useUser();

  useEffect(() => {
    if (!user?.id) return;
  
    async function fetchRooms() {
      try {
        const rooms = await getChatRooms();
        console.log("rooms", rooms);
  
        const formattedRooms = rooms.map((room: ChatRoomType) => {
          const isMe = user?.id === room.participant1;
          return {
            ...room,
            participant: isMe ? room.participant2 : room.participant1,
            participantName: isMe ? room.participant2Profile?.name : room.participant1Profile?.name,
            MyName: isMe ? room.participant1Profile?.name : room.participant2Profile?.name,
            myId: isMe ? room.participant1 : room.participant2,
            isMe,
          };
        });
        setChatRooms(formattedRooms);
      } catch (error) {
        console.error("🚨 채팅방 목록 불러오기 실패:", error);
      }
    }
    fetchRooms();
  }, [user?.id]);

  useEffect(() => {
    if (!selectedRoom) return;
  
    async function fetchMessages() {
      try {
        if (!selectedRoom?.roomId) return;
        const messages = await getChatMessages(selectedRoom.roomId, 1, 50);
        setMessageList(messages);
      } catch (error) {
        console.error("🚨 메시지 불러오기 실패:", error);
      }
    }
  
    fetchMessages();
    socket.emit("joinRoom", selectedRoom.roomId);
    socket.on("receiveMessage", async (msg: Message) => {
      setMessageList((prevMessages) => [...prevMessages, msg]);
    });
  
    return () => {
      socket.emit("leaveRoom", selectedRoom.roomId);
      socket.off("receiveMessage");
    };
  }, [selectedRoom]);

  

  const handleSendMessage = async (message: string) => {
    if (!selectedRoom || !user) return;

    const newMessage: Message = {
      senderId: user.id,
      message,
      createdAt: new Date().toISOString(),
    };

    setMessageList((prev) => [...prev, { ...newMessage, createdAt: new Date().toISOString() }]);

    socket.emit("sendMessage", newMessage);

    try {
      await sendMessage(selectedRoom.roomId, message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveRoom = async () => {
    if (!selectedRoom) return;

    try {
      await leaveChatRoom(selectedRoom.roomId);
      setChatRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== selectedRoom.roomId));
      setSelectedRoom(null);
    } catch (error) {
      toast.error("이미 닫힌 방이에요!");
    }
  };

  return (
    <div className="flex h-[94.6vh]">
      <ChatList chatRooms={chatRooms} selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
      <ChatRoom selectedRoom={selectedRoom} messageList={messageList} onSendMessage={handleSendMessage} onLeaveRoom={handleLeaveRoom} />
    </div>
  );
}