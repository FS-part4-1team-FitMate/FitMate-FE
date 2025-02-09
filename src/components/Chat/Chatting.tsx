import React, {useState, useRef, useEffect} from "react";

function ChattingComponent({nickname, chatting, time, isMe}: any) {
const [chatNick, setChatNick] = useState("");

useEffect(() => {
	setChatNick(isMe ? "나" : nickname);
}, [isMe, nickname]);

return (
	<>
        {isMe ? (
        <div id="me" className="flex justify-end my-5">
          <div id="time" className="flex flex-col justify-end mr-3">
            <p className="text-xs text-black">{time}</p>
          </div>
          <div className="mr-3">
            <div id="nickname" className="flex justify-end">
              <p className="text-xs text-white">{chatNick}</p>
            </div>
            <div id="chatting" className="p-3 bg-white rounded-md mt-2">
              <span className="text-xs text-black">
                {chatting}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div id="you" className="flex my-5">
          <div className="ml-3">
            <p id="nickname" className="text-xs text-white">
              {chatNick}
            </p>
            <div id="chatting" className="p-3 bg-white rounded-md mt-2">
              <span className="text-xs text-black">
                {chatting}
              </span>
            </div>
          </div>
          <div id="time" className="flex flex-col justify-end ml-3">
            <p className="text-xs text-black">{time}</p>
          </div>
        </div>
      )}
    </>
);
}

export default ChattingComponent;