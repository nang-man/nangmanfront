// Chat page
import ChatVideo from "@/app/chat/ChatVideo";
import ChatBubble from "@/app/chat/ChatBubble";

import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { FaPhoneSlash, FaPhone } from "react-icons/fa6";

const dummyData = {
  name: "홍길동",
  message: "안녕하세요",
  date: "오전 12:35",
  img: "",
  isUser: false,
};

const Chat = () => {
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
          {[1, 2, 3, 4].map((index) => (
            <ChatBubble
              key={index}
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
        <form className="join flex">
          <input
            className="input input-bordered join-item"
            placeholder="Text..."
          />
          <button
            type="submit"
            className="join-item  px-3 bg-emerald-600 rounded-5"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
