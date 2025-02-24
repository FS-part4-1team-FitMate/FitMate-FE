import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

const socket = io(`${SOCKET_URL}/socket.io/`, {
  transports: ["websocket"],
  reconnectionAttempts: 3,
  timeout: 5000,
  withCredentials: true
});


export default socket;