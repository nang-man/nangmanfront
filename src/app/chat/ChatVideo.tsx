// User's video screen
import {
  FaMicrophoneSlash,
  FaMicrophone,
  FaVideo,
  FaPhone,
  FaPhoneSlash,
  FaVideoSlash,
} from "react-icons/fa";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import { useState } from "react";
import video_url from "@/assets/test.mp4";

interface IChatVideoProps {
  isMain?: boolean;
  userName: string;
  videoSrc?: string;
  soundSrc?: string;
}

const ChatVideo = ({
  isMain,
  userName,
  videoSrc,
  soundSrc,
}: IChatVideoProps) => {
  const [muteBtn, setMuteBtn] = useState(false);
  const [expandBtn, setExpandBtn] = useState(false);
  const [playVideoBtn, setPlayVideoBtn] = useState(false);
  const [startChatBtn, setStartChatBtn] = useState(false);

  const btnStyle = "w-4 h-4 hover:text-white transition-colors";
  const mainStyle =
    "relative rounded-xl w-full h-[76%] mt-[2%] bg-black overflow-hidden";

  //
  const onToggleVideoBtn = () => {
    // 비디오 연결/해제
    setPlayVideoBtn((prev) => !prev);
  };
  const onToggleChatBtn = () => {
    setStartChatBtn((prev) => !prev);
  };
  const onToggleMuteBtn = () => {
    setMuteBtn((prev) => !prev);
  };

  const onExpandBtn = () => {
    // redux에서 메인 화면 데이터를 수정
  };

  // UI - control buttons
  const mainBtns = (
    <div className="absolute bottom-[10%] left-[50%] translate-x-[-50%]">
      <button onClick={onToggleVideoBtn}>
        {playVideoBtn ? (
          <FaVideoSlash className="w-8 h-8 transition-colors hover:text-white" />
        ) : (
          <FaVideo className="w-8 h-8 transition-colors hover:text-white" />
        )}
      </button>
      <button onClick={onToggleChatBtn}>
        {startChatBtn ? (
          <FaPhoneSlash className="text-red-600 mx-7 w-12 h-12 transition-colors hover:text-red-800" />
        ) : (
          <FaPhone className="text-green-600 mx-7 w-12 h-12 transition-colors hover:text-green-800" />
        )}
      </button>
      <button onClick={onToggleMuteBtn}>
        {muteBtn ? (
          <FaMicrophoneSlash className="w-8 h-8 transition-colors hover:text-white" />
        ) : (
          <FaMicrophone className="w-8 h-8 transition-colors hover:text-white" />
        )}
      </button>
    </div>
  );

  const otherVideoBtns = (
    <div className="z-10 mr-5 text-gray-400 bg-black/40 rounded-md px-3 py-1">
      <button onClick={onToggleMuteBtn}>
        {muteBtn ? (
          <FaMicrophoneSlash className={btnStyle} />
        ) : (
          <FaMicrophone className={btnStyle} />
        )}
      </button>
      <button onClick={onExpandBtn} className="ml-2">
        <BsArrowsAngleExpand className={btnStyle} />
      </button>
    </div>
  );

  return (
    <div
      className={
        isMain
          ? mainStyle
          : "relative bg-slate-400 w-1/3 h-90 rounded-xl overflow-hidden"
      }
    >
      <div className="absolute top-3 left-2 h-auto w-full flex justify-between">
        <span className="rounded-xl bg-black/40 text-white px-3 py-1">
          {userName}
        </span>
        {!isMain && otherVideoBtns}
      </div>
      <video className="h-full w-auto m-auto flex justify-between" controls>
        <source src={video_url} type="video/mp4" />
      </video>
      {isMain && mainBtns}
    </div>
  );
};

export default ChatVideo;
