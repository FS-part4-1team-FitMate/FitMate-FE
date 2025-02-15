import React, { useEffect, useState } from "react";

function Chatting({ nickname, chatting, time, isMe }: any) {
  const [chatNick, setChatNick] = useState("");

  useEffect(() => {
    setChatNick(isMe ? "나" : nickname);
  }, [isMe, nickname]);

  return (
    <>
      {isMe ? (
        <div className="flex justify-end my-5">
          <div className="flex flex-col justify-end mr-3">
            <p className="text-xs text-black">{time}</p>
          </div>
          <div className="mr-3 bg-yellow-400 text-black text-sm rounded-lg p-2 max-w-xs">
            {chatting}
          </div>
        </div>
      ) : (
        <div className="flex my-5">
          <div className="ml-3 bg-white text-black text-sm rounded-lg p-2 max-w-xs">
            {chatting}
          </div>
          <div className="flex flex-col justify-end ml-3">
            <p className="text-xs text-black">{time}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatting;