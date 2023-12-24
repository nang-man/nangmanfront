import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import dayjs from "dayjs";

import ChatBubble from "@/app/chat/ChatBubble";
import { Messages } from "@/types/index";

interface ChatModalRoomProps {
  fllowers: {
    id: string;
    name: string;
    src: string;
  }[];
  socket: Socket;
  userId: string;
  joinChat: boolean;
  messages: Messages[];
  updateReceiveMessage: (props: Messages) => void;
}

const ChatModalRoom = React.memo(
  ({
    fllowers,
    socket,
    userId,
    messages,
    joinChat,
    updateReceiveMessage,
  }: ChatModalRoomProps) => {
    const messageRef = useRef<HTMLInputElement | null>(null);
    const [message, setMessage] = useState<string>("");

    const dayJs = dayjs();

    const findUser = fllowers.find((user) => user.id === userId);

    console.log(findUser, socket);

    useEffect(() => {
      socket.on("sendMessage", updateReceiveMessage);
    });

    const sendMessage = (userId: string, message: string, time: string) => {
      socket.emit("sendMessage", userId, message, time);
    };

    socket.on("receiveMessage", (message: string) => {
      console.log("Received message:", message);
    });

    const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setMessage(value);
    };

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message === "" && message.trim()) return;

      setMessage("");

      sendMessage(userId, message, dayJs.format("YYYY-MM-DDTAhh:mm"));
    };

    return (
      <div>
        <div>
          <ul className="overflow-y-auto max-h-[400px]">
            {messages &&
              messages.map((message, idx: number) => (
                // <ChatBubble
                // key={`${message.name}+${idx}`}
                // name={message.name}
                // message={message.message}
                // date={message.time}
                // img={message.img}
                // isUser={message.isUser}
                <li key={`${message.name}+${idx}`}>
                  {message.name}
                  {message.message}
                  {message.time}
                  {message.img}
                  {message.isUser}
                </li>
                // />
              ))}
          </ul>
        </div>
        <form onSubmit={onSubmit} className="join flex w-auto">
          <input
            ref={messageRef}
            value={message}
            onChange={onChangeData}
            className="input input-bordered join-item"
            placeholder="Text..."
          />
          <button
            type="submit"
            className="join-item px-3 bg-emerald-600 rounded-5"
          >
            전송
          </button>
        </form>
      </div>
    );
  }
);

export default ChatModalRoom;
