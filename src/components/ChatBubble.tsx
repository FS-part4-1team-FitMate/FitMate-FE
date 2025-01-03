import React from "react";

type ChatBubbleProps = {
  type: "question" | "answer";
  content: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ type, content }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        type === "question"
          ? "bg-gray-200 text-gray-800 text-left"
          : "bg-blue-500 text-white text-right"
      }`}
    >
      {content}
    </div>
  );
};

export default ChatBubble;