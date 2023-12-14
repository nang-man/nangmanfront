import React, { useRef, useState } from "react";
import { Socket } from "socket.io-client";

import ChatBubble from "@/app/chat/ChatBubble";

interface ChatModalRoomProps {
  fllowers: {
    id: string;
    name: string;
    src: string;
  }[];
  socket: Socket;
  userId: string;
}

const dummyData = {
  name: "홍길동",
  message: "안녕하세요",
  date: "오전 12:35",
  img: "",
  isUser: false,
};

const ChatModalRoom = React.memo(
  ({ fllowers, socket, userId }: ChatModalRoomProps) => {
    const messageRef = useRef<HTMLInputElement | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const filterUser = fllowers.filter((user) => user.id === userId);

    const sendMessage = (userId: string, message: string) => {
      socket.emit("sendMessage", userId, message);
    };

    socket.on("receiveMessage", (message: string) => {
      console.log("Received message:", message);
    });

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
  }
);

export default ChatModalRoom;

function useCallback(arg0: () => void, arg1: any[]) {
  throw new Error("Function not implemented.");
}
