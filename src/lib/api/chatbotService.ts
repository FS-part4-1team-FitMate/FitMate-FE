import { post } from "./method";

export interface ChatResponse {
  response: string;
}

async function postChatBotMsg(message: string): Promise<ChatResponse> {
  const res = await post(`/chatbot/message`, { message });
  return res.data;
}
