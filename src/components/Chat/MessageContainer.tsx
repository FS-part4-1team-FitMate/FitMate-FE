import React from "react";

interface User {
  name: string;
}

interface Message {
  _id: string;
  chat: string;
  user: User;
}

interface MessageContainerProps {
  messageList: Message[];
  user: User;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messageList, user }) => {
  return (
    <div className="space-y-2">
      {messageList.map((message, index) => (
        <div key={message._id} className="w-full">
          {message.user.name === "system" ? (
            <div className="flex justify-center items-center">
              <p className="bg-gray-600 text-white text-sm rounded-full py-1 px-4 text-center">
                {message.chat}
              </p>
            </div>
          ) : message.user.name === user.name ? (
            <div className="flex justify-end mb-1">
              <div className="bg-yellow-400 text-black text-sm rounded-lg p-2 max-w-xs">
                {message.chat}
              </div>
            </div>
          ) : (
            <div className="flex justify-start items-center space-x-2">
              <img
                src="/profile.jpeg"
                className={`w-9 h-9 rounded-full ${
                  index === 0 ||
                  messageList[index - 1].user.name === user.name ||
                  messageList[index - 1].user.name === "system"
                    ? "visible"
                    : "invisible"
                }`}
                alt="Profile"
              />
              <div className="bg-white text-black text-sm rounded-lg p-2 max-w-xs">
                {message.chat}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;