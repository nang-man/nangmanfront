import React, { useEffect, useState, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { io } from "socket.io-client";
import dayjs from "dayjs";

const dummyData = {
  name: "홍길동",
  id: "123",
  message: "안녕하세요",
  time: "오전 12:35",
  img: "",
  isUser: false,
};

interface IMessage {
  name: string;
  id: string;
  message: string;
  time: string;
  img: string;
  isUser: boolean;
}

const ChatRoom = () => {
  // input data
  const [messages, setMessages] = useState<IMessage | any>([]);
  const [inputMessage, setInputMessage] = useState("");

  const [ChatRoomMessage, setChatRoomMessage] = useState("");

  const [joinChat, setJoinChat] = useState(false);

  // socket data
  const [socketInstance, setSocketInstance] = useState<any>(null);
  const scrollRef = useRef<any>(null);

  const dayJs = dayjs();

  const socketMessage = (data: any) => {
    setChatRoomMessage(data.message);
    console.log(data);
  };

  const updateReceiveMessage = (data: any) => {
    const messageData = {
      // isUser: getData.id === dummyData.id ? true : false,
      isUser: false,
      name: "김낭만",
      id: data.id,
      message: data.message,
      time: data.time,
      img: "",
    };
    setMessages((prev: any) => [...prev, messageData]);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("handshake", () => {
      socketInstance.emit("handshake", "Hello this is client");
      setChatRoomMessage("Connected to server");
    });
    socket.on("joinChatRoom", socketMessage);
    socket.on("leaveChatRoom", socketMessage);
    socket.on("sendMessage", updateReceiveMessage);
    socket.on("disconnect", socketMessage);

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  // scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputMessage(value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (socketInstance) {
      const data = {
        id: socketInstance.id,
        message: inputMessage,
        time: dayJs.format("YYYY-MM-DDTAhh:mm"),
      };

      setInputMessage("");
      sendMessage(data);
    }
  };

  const sendMessage = (data: any) => {
    // @param data {roomId, name, message}
    // @return object {user, message}

    // Join chat room
    if (!joinChat) {
      joinChatRoom();
      setJoinChat(true);
    }

    if (socketInstance) {
      socketInstance.emit(
        "sendMessage",
        {
          name: data.id,
          roomId: "Test",
          message: data.message,
          time: data.time,
        },
        (getData: any) => {
          // 서버에서 받은 콜백 메시지 처리
          const messageData = {
            // isUser: getData.id === userData.id ? true : false,
            isUser: true,
            name: "이낭만",
            id: getData.id,
            message: getData.message,
            time: getData.time,
            img: "",
          };
          setMessages((prev: any) => [...prev, messageData]);
        }
      );
    }
  };

  const joinChatRoom = () => {
    socketInstance.emit("handshake", "Hello this is client");

    socketInstance.emit("joinChatRoom", {
      name: socketInstance.id,
      roomId: "Test",
    });
  };

  const leaveRoom = () => {
    socketInstance.emit("leaveChatRoom", {
      name: dummyData.id,
      roomId: "Test",
    });
  };

  const disconnect = () => {
    socketInstance.emit("disconnect", { message: "The connection is closed" });
    setJoinChat(false);
  };

  return (
    <article className="relative bg-gray-100 w-full h-[90%] mx-10 border border-gray-300 rounded-lg">
      <h2 className="text-2xl mt-3 ml-4 pb-2 border-b-2">채팅하기</h2>
      <ul
        ref={scrollRef}
        className="h-[85%] w-full overflow-scroll scrollbar-hidden"
      >
        {ChatRoomMessage.length > 0 && (
          <li>-------채팅방에 입장하였습니다.-------</li>
        )}
        {messages &&
          messages.map((item: any, index: number) => (
            <ChatBubble
              key={item + index}
              name={item.name}
              message={item.message}
              date={item.time}
              img={item.img}
              isUser={item.isUser}
            />
          ))}
      </ul>
      <form
        className="absolute bottom-0 left-0 join grid grid-cols-8-2 w-full p-2"
        onSubmit={onSubmit}
      >
        <input
          value={inputMessage}
          onChange={onChangeData}
          className="input input-bordered join-item"
          placeholder="Text..."
        />
        <button
          type="submit"
          className="join-item text-white bg-emerald-600 rounded-5 font-semibold hover:bg-emerald-700"
        >
          전송
        </button>
      </form>
    </article>
  );
};

export default ChatRoom;
