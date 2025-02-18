import { get, post, remove } from "./method";

// 🔹 채팅방 목록 가져오기
export async function getChatRooms(page = 1, limit = 10) {
  const res = await get(`/chat/rooms?page=${page}&limit=${limit}`);
  console.log(res.data)
  return res.data;
}

// 🔹 특정 채팅방의 메시지 가져오기
export async function getChatMessages(roomId: string, page = 1, limit = 20) {
  const res = await get(`/chat/messages/${roomId}?page=${page}&limit=${limit}`);
  console.log("메시지 데이터:", res.data);
  return res.data;
}

// 🔹 채팅방 생성 (또는 기존 채팅방 반환)
export async function createOrGetChatRoom(participantId: string) {
  const res = await post("/chat/room", { participantId });
  return res.data;
}

// 🔹 메시지 보내기
export async function sendMessage(receiverId: string, message: string) {
    console.log("메시지 전송 요청:", { receiverId, message });
    try {
      const res = await post("/chat/send", { receiverId, message });
      console.log("메시지 전송 성공:", res.data);
      return res.data;
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
    }
  }
  

// 🔹 채팅방 나가기
export async function leaveChatRoom(roomId: string) {
  const res = await remove(`/chat/leave/${roomId}`);
  return res.data;
}
