// Chat page
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatVideo from "@/app/chat/ChatVideo";

import { IoSettingsOutline } from "react-icons/io5";

import { users } from "@/apis/user.ts";
import ChatRoom from "./ChatRoom";
import { useModal } from "@/hooks/useModal";
import { CREATE_STATE } from "@/hooks/modalType";

const Chat = () => {
  const [mainVideoData, setMainVideoData] = useState([]);

  const userlist = users();
  const toggleMainVideo = (data: any) => {
    // 클릭한 비디오의 데이터를 저장 -> 큰 화면에 전달
    setMainVideoData(data);
  };

  const { onOpen } = useModal(CREATE_STATE);
  console.log(userlist);

  const navigation = useNavigate();
  return (
    <section className="flex flex-col w-[85vw] h-[95vh] m-auto">
      <header>
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
          <button onClick={() => onOpen()}>
            <IoSettingsOutline />
          </button>
        </div>
      </header>
      <div className="w-full h-[80%] grid grid-cols-chat gap-[3%]">
        {/* other video wrap */}
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex gap-4 h-[28%]">
            <ChatVideo userName="김낭만" />
            <ChatVideo userName="이낭만" />
            <ChatVideo userName="박낭만" />
          </div>
          <ChatVideo userName="정낭만" isMain={true} />
        </div>
        <ChatRoom />
      </div>
    </section>
  );
};

export default Chat;
