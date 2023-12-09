// Other people's video screens
import { FaMicrophoneSlash, FaMicrophone } from "react-icons/fa";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";

const ChatVideo = () => {
  return (
    <div className="bg-slate-400 w-1/3 h-90 rounded-xl p-3">
      <div className="h-auto w-full flex justify-between">
        <span className="rounded-xl bg-black/40 text-white px-3 py-1">
          userId
        </span>
        <div>
          <button className="bg-white">
            <FaMicrophone className="w-6 h-6" />
            {/* <FaMicrophoneSlash className="w-6 h-6" /> */}
          </button>
          <button className="bg-white">
            <BsArrowsAngleExpand className="w-6 h-6" />
            {/* <BsArrowsAngleContract className="w-6 h-6" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;
