import React from "react";

type ChatBubbleProps = {
  type: "question" | "answer";
  content: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ type, content }) => {
  return (
    <div
      className={`p-4 rounded-lg max-w-xs ${
        type === "question"
          ? "bg-white text-black rounded-t-lg rounded-br-lg rounded-none"
          : "bg-blue-500 text-white rounded-b-lg rounded-tl-lg rounded-none self-end"
      }`}
    >
      {content}
    </div>
  );
};

export default ChatBubble;