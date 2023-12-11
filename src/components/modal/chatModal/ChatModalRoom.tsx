import React from "react";

import ChatBubble from "@/app/chat/ChatBubble";

interface ChatModalRoomProps {
  fllowers: {
    id: number;
    name: string;
    src: string;
  }[];
}

const dummyData = {
  name: "홍길동",
  message: "안녕하세요",
  date: "오전 12:35",
  img: "",
  isUser: false,
};

const ChatModalRoom = React.memo(({ fllowers }: ChatModalRoomProps) => {
  return (
    <div>
      <div>
        <ul className="overflow-y-auto max-h-[400px]">
          {fllowers.map((fllower) => (
            <ChatBubble
              name={fllower.name}
              message={dummyData.message}
              date={dummyData.date}
              img={fllower.src}
              isUser={dummyData.isUser}
            />
          ))}
          <ChatBubble
            name={dummyData.name}
            message={dummyData.message}
            date={dummyData.date}
            img={dummyData.img}
            isUser={true}
          />
        </ul>
      </div>
      <div className="join flex w-auto">
        <input
          className="input input-bordered join-item"
          placeholder="Text..."
        />
        <button className="join-item px-3 bg-emerald-600 rounded-5">
          전송
        </button>
      </div>
    </div>
  );
});

export default ChatModalRoom;
