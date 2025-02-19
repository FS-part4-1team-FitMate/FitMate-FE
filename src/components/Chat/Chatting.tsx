
import formatDateTime from "@/lib/utils/formatDateTime";
import React from "react";

function Chatting({ chatting, time, isMe}: any) {


  return (
    <>
      {isMe ? (
        <div className="flex justify-end my-5">
          <div className="flex flex-col justify-end mr-3">
            <p className="text-xs text-black">{formatDateTime(time).split(" ").slice(-2).join(" ")}</p>
          </div>
          <div className="mr-3 bg-blue-300 text-white text-sm rounded-lg p-4 max-w-xs">
            {chatting}
          </div>
        </div>
      ) : (
        <div className="flex my-5">
          <div className="ml-3 bg-gray-100 text-black text-sm rounded-lg p-4 max-w-xs">
            {chatting}
          </div>
          <div className="flex flex-col justify-end ml-3">
            <p className="text-xs text-black">{formatDateTime(time).split(" ").slice(-2).join(" ")}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatting;