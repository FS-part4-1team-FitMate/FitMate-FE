import React from "react";

type ChatBubbleProps = {
  type: "question" | "answer";
  content: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ type, content }) => {
  return (
    <div
      className={`flex max-w-fit py-4 px-6 rounded-[1.6rem] my-2 shadow-card ${
        type === "question"
          ? "text-lg bg-white text-black rounded-t-[1.6rem] rounded-br-[1.6rem] rounded-none ml-6"
          : "text-lg bg-blue-300 text-white rounded-b-[1.6rem] rounded-tl-[1.6rem] rounded-none self-end mr-6"
      }`}
    >
      {content}
    </div>
  );
};

export default ChatBubble;
