import { get, post, remove } from "./method";

// 🔹 채팅방 목록 가져오기
export async function getChatRooms(page = 1, limit = 10) {
  console.log("📌 getChatRooms 호출됨"); // ✅ 실행 여부 확인
  try {
    const res = await get(`/chat/rooms?page=${page}&limit=${limit}`);
    console.log("📌 채팅목록 응답 데이터:", res.data); // ✅ 응답 확인
    return res.data;
  } catch (error) {
    console.error("🚨 채팅 목록 API 요청 실패:", error);
  }
}

// 🔹 특정 채팅방의 메시지 가져오기
export async function getChatMessages(roomId: string, page = 1, limit = 20) {
  const res = await get(`/chat/messages/${roomId}?page=${page}&limit=${limit}`);
  console.log("메시지 데이터:", res.data);
  return res.data;
}

// 🔹 채팅방 생성 (또는 기존 채팅방 반환)
export async function createOrGetChatRoom(participantId: string | undefined) {
  const res = await post("/chat/room", { participantId });
  console.log("채팅방생성:", res.data);
  return res.data;
}

// 🔹 메시지 보내기
export async function sendMessage(roomId: string | undefined, message: string) {
  console.log("메시지 전송 요청:", { roomId, message });
  try {
    const res = await post("/chat/send", { roomId, message });
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
