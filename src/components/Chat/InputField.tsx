import React from "react";

interface InputFieldProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (event: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className="flex items-center bg-red-500 min-h-[50px] fixed bottom-0 w-full">
      <div className="bg-slate-500 text-white font-bold flex justify-center items-center text-2xl w-[50px]">
        +
      </div>
      <form
        onSubmit={sendMessage}
        className="flex items-center justify-between w-full"
      >
        <input
          type="text"
          placeholder="Type in here…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="flex-1 h-full px-2 border-none focus:outline-none"
        />
        <button
          type="submit"
          disabled={message === ""}
          className={`min-w-[70px] h-full bg-yellow-400 border-none ${
            message === "" ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer active:bg-yellow-300"
          }`}
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default InputField;