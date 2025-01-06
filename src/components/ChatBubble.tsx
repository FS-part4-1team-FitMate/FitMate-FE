import React from "react";

type ChatBubbleProps = {
  type: "question" | "answer";
  content: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ type, content }) => {
  return (
    <div
      className={`flex max-w-fit p-4 rounded-lg my-2 ${
        type === "question"
          ? "text-lg bg-white text-black rounded-t-lg rounded-br-lg rounded-none ml-6"
          : "text-lg bg-blue-300 text-white rounded-b-lg rounded-tl-lg rounded-none self-end mr-6"
      }`}
    >
      {content}
    </div>
  );
};

export default ChatBubble;