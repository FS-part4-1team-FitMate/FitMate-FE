import { io, Socket } from "socket.io-client";

// 환경 변수에서 WebSocket URL 가져오기
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"], // 웹소켓 연결 우선 사용
  withCredentials: true, // CORS 문제 방지
});

export default socket;