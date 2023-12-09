// Chat page
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatVideo from "@/app/chat/ChatVideo";

import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import ChatRoom from "./ChatRoom";
import { useModal } from "@/hooks/useModal";
import { CREATE_STATE } from "@/hooks/modalType";
import { getChatRoomData } from "@/apis/chat";

const dummyRoomData = {
  roomId: "test1",
  tag: "test",
  admin: "user1",
  title: "Title",
  userData: [
    {
      id: "user1",
      name: "김낭만",
      videoSrc: "",
      soundSrc: "",
      img: "",
    },
    {
      id: "user2",
      name: "이낭만",
      videoSrc: "",
      soundSrc: "",
      img: "",
    },
    {
      id: "user3",
      name: "박낭만",
      videoSrc: "",
      soundSrc: "",
      img: "",
    },
    {
      id: "user4",
      name: "정낭만",
      videoSrc: "",
      soundSrc: "",
      img: "",
    },
  ],
};

const dummyUserData = {
  name: "김낭만",
  id: "user1",
  img: "",
};

const Chat = () => {
  const [mainVideoData, setMainVideoData] = useState([]);
  const [otherUserData, setOtherUserData] = useState<any>(null);

  // Get room data
  const pageData = useParams();

  useEffect(() => {
    const otherUsers = dummyRoomData.userData.filter(
      (user) => user.id !== dummyUserData.id
    );
    setOtherUserData(otherUsers);

    //const chatRoomData = getChatRoomData(pageData.roomId)
  }, []);

  const toggleMainVideo = (data: any) => {
    // 클릭한 비디오의 데이터를 저장 -> 큰 화면에 전달
    setMainVideoData(data);
  };

  const { onOpen } = useModal(CREATE_STATE);

  // Update Chat room data
  const onEditRoomData = () => {
    if (dummyRoomData.admin === dummyUserData.id) {
      onOpen();
    }
  };
  // console.log(userlist);

  const navigation = useNavigate();

  const onGoList = () => {
    if (window.confirm("채팅을 종료하시겠습니까?")) {
      navigation("/list");
    }
  };

  return (
    <section className="flex flex-col w-[85vw] h-[95vh] m-auto">
      <header className="relative">
        <div>
          <h1 className="text-3xl font-bold">{dummyRoomData.title}</h1>
          <h3 className="text-gray-600 font-semibold text-xl mt-3">
            Tag: #{dummyRoomData.tag}
          </h3>
          <button className="absolute top-0 right-0" onClick={onGoList}>
            <HiOutlineXMark className="text-gray-600 text-3xl hover:text-red-600" />
          </button>
        </div>
        <div className="flex justify-end mr-[5%] mb-5">
          <span className="font-semibold mr-3">참여자 수 2명</span>
          <button
            onClick={onEditRoomData}
            className="text-2xl text-gray-600 hover:text-gray-800"
          >
            <IoSettingsOutline />
          </button>
        </div>
      </header>
      <div className="w-full h-[80%] grid grid-cols-chat gap-[3%]">
        {/* other video wrap */}
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex gap-4 h-[28%]">
            {otherUserData &&
              otherUserData.map((user: any, index: string) => (
                <ChatVideo
                  key={index}
                  userName={user.name}
                  videoSrc={user.videoSrc}
                  soundSrc={user.soundSrc}
                />
              ))}
          </div>
          <ChatVideo userName="정낭만" isMain={true} />
        </div>
        <ChatRoom
          roomId={dummyRoomData.roomId}
          userData={dummyRoomData.userData}
        />
      </div>
    </section>
  );
};

export default Chat;
