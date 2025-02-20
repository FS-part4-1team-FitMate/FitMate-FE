import { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState<{ string }[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <main className="flex flex-col space-y-6 bg-gray-100 min-h-screen pb-16">
      <div className="bg-white p-10 w-full space-y-6 px-8 pc:px-[20rem]">
        <h1 className="text-xl">AI 챗봇과 대화하기</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5"></div>
      </div>
      <div className="flex flex-col space-y-4 w-full px-8 pc:px-[20rem]">
        <div className="flex flex-col">
          <div className="flex max-w-fit py-4 px-6 rounded-[1.6rem] my-2 shadow-card text-lg bg-white text-black rounded-t-[1.6rem] rounded-br-[1.6rem] rounded-bl-none ml-6">
            어떤 운동을 하고 싶으세요?
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChatBot;
