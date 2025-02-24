import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

const socket = io(`${SOCKET_URL}`, {
  transports: ["websocket"],
  reconnectionAttempts: 3,
  timeout: 5000,
  withCredentials: true
});

socket.on("connect", () => {
  console.log("WebSocket 연결");
});

socket.on("connect_error", (err) => {
  console.error("WebSocket 연결 실패:", err);
});

export default socket;