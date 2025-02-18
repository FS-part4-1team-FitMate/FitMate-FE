import React from "react";

type InputFieldProps = {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (event: React.FormEvent) => void;
};

const InputField: React.FC<InputFieldProps> = ({ message, setMessage, sendMessage }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(event);
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event as unknown as React.FormEvent);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 w-full border-gray-300">
      <textarea
        className="flex-1 p-3 border rounded-lg text-lg resize-none h-40"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-3 bg-blue-500 text-white rounded-lg w-40"
      >
        전송
      </button>
    </form>
  );
};

export default InputField;