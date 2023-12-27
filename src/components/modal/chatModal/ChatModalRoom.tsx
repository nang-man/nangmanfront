import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import dayjs from "dayjs";

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

    useEffect(() => {
      socket.on("sendMessage", updateReceiveMessage);
    });

    const sendMessage = (userId: string, message: string, time: string) => {
      socket.emit(
        "sendMessage",
        { userId, message, time },
        (message: Messages) => updateReceiveMessage(message)
      );
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

      sendMessage(userId, message, dayJs.format("hh:mm"));
    };

    if (!joinChat) {
      return;
    }

    return (
      <div>
        <div>
          <ul className="overflow-y-auto max-h-[400px]">
            {messages &&
              messages.map((message, idx: number) => (
                <li key={idx}>
                  {findUser && (
                    <div className="flex">
                      <div>
                        <img src={findUser?.src} />
                      </div>
                      <div className="flex flex-col">
                        <p>
                          {findUser?.name} {message.time}
                        </p>
                        <div>
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
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
