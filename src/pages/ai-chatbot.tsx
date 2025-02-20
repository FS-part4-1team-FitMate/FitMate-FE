import { useState } from "react";
import { useForm } from "react-hook-form";
import { postChatBotMsg } from "@/lib/api/chatbotService";
import Button from "@/components/Common/Button";
import Textarea from "@/components/Common/Textarea";

function ChatBot() {
  const [messages, setMessages] = useState<{ id: string; message: string }[]>([
    {
      id: "bot",
      message:
        "저는 사용자의 몸 상태와 목표에 맞는 운동을 추천하는 전문가입니다. 무엇을 도와드릴까요?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      message: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: { message: string }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessages((prev) => [...prev, { id: "user", message: data.message }]);
    const response = await postChatBotMsg(data.message);
    setMessages((prev) => [...prev, { id: "bot", message: response.response }]);
    setIsSubmitting(false);
    setInput("");
  };

  return (
    <main className="flex flex-col space-y-6 bg-gray-100 min-h-screen pb-16">
      <div className="bg-white p-10 w-full space-y-6 px-8 pc:px-[20rem]">
        <h1 className="text-xl">AI 챗봇과 대화하기</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5"></div>
      </div>
      {messages.map((msg) => {
        if (msg.id === "bot") {
          return (
            <div className="flex flex-col space-y-4 w-full px-8 pc:px-[20rem]">
              <div className="flex flex-col">
                <div className="flex max-w-fit py-4 px-6 rounded-[1.6rem] my-2 shadow-card text-lg bg-white text-black rounded-t-[1.6rem] rounded-br-[1.6rem] rounded-bl-none ml-6">
                  {msg.message}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="w-full max-w-md pc:max-w-xl tablet:max-w-lg bg-white shadow-md p-6 rounded-b-[1.6rem] rounded-tl-[1.6rem] rounded-none self-end mr-8 pc:mr-[22rem]">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2 text-lg">{msg.message}</div>
              </div>
            </div>
          );
        }
      })}
      <div className="w-full max-w-md pc:max-w-xl tablet:max-w-lg bg-white shadow-md p-6 rounded-b-[1.6rem] rounded-tl-[1.6rem] rounded-none self-end mr-8 pc:mr-[22rem]">
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
            <textarea
              {...register("message", {
                required: "질문을 입력해 주세요.",
              })}
              placeholder="질문을 입력해 주세요."
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="bg-blue-300 text-lg text-white placeholder:text-white rounded-xl min-h-[160px] max-h-[300px] p-5 border-[1px] border-solid border-gray-300 overflow-y-auto"
            ></textarea>
            <Button
              type="submit"
              className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!input || isSubmitting}
            >
              입력 완료
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ChatBot;
