// Chat page
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoSettingsOutline } from "react-icons/io5";
import { FaMicrophone, FaVideo } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

import ChatVideo from "@components/ChatVideo";
import ChatBubble from "@components/ChatBubble";
import { socket } from "@/data/socket.ts";
import { users } from "@/apis/user.ts";

const dummyData = {
  name: "홍길동",
  message: "안녕하세요",
  date: "오전 12:35",
  img: "",
  isUser: false,
};

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const userlist = users();

  console.log(userlist);

  useEffect(() => {
    // 서버로부터 메시지를 받았을 때의 이벤트 리스너
    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // 메시지를 서버로 보내는 이벤트
    socket.emit("sendMessage", inputMessage);
    setInputMessage("");
  };

  const navigation = useNavigate();
  return (
    <div className="flex w-full">
      <div className=" w-8/12">
        <div>
          <h1>방제</h1>
          <h3>태그</h3>
          <button
            className="bg-emerald-600"
            onClick={() => navigation("/list")}
          >
            나가기
          </button>
        </div>
        <div>
          <span>참여자 수 2명</span>
          <button>
            <IoSettingsOutline />
          </button>
        </div>
        {/* other video wrap */}
        <div className="w-full h-full">
          <div className="flex gap-4 h-1/5">
            <ChatVideo />
            <ChatVideo />
            <ChatVideo />
          </div>
          <div className="rounded-xl p-3 w-full h-3/5 my-5 bg-slate-500">
            <span className="rounded-xl bg-black/40 text-white px-3 py-1">
              userId
            </span>
            <div>
              <button>
                <FaVideo className="w-6 h-6" />
                {/* <FaVideoSlash  className="w-6 h-6" /> */}
              </button>
              <button>
                <FaPhone className="w-6 h-6" />
                {/* <FaPhoneSlash className="w-6 h-6" /> */}
              </button>
              <button>
                <FaMicrophone className="w-6 h-6" />
                {/* <FaMicrophoneSlash className="w-6 h-6" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-1/4 h-full mx-10">
        <h2 className="text-2xl">채팅하기</h2>
        <ul className="">
          {[1, 2, 3, 4].map(() => (
            <ChatBubble
              name={dummyData.name}
              message={dummyData.message}
              date={dummyData.date}
              img={dummyData.img}
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
        <div className="join flex">
          <input
            className="input input-bordered join-item"
            placeholder="Text..."
          />
          <button className="join-item  px-3 bg-emerald-600 rounded-5">
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
