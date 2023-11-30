import React, { useRef, useState, useEffect } from "react";

import { IoArrowBack, IoClose } from "react-icons/io5";

// import ChatBubble from "@/app/chat/ChatBubble";

interface ChatModalProps {
  onToggle: () => void;
  name?: string;
  message?: string;
  data?: string;
  src?: string;
  isUser?: boolean;
}

const testUser = [
  { id: 1, name: "차범근" },
  { id: 2, name: "손흥민" },
  { id: 3, name: "박지성" },
];

const ChatModal = ({ onToggle }: ChatModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState<number | null>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffsetX(
      e.clientX - (modalRef.current?.getBoundingClientRect().left || 0)
    );
    setOffsetY(
      e.clientY - (modalRef.current?.getBoundingClientRect().top || 0)
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - (offsetX || 0);
      const newY = e.clientY - (offsetY || 0);

      if (modalRef.current) {
        modalRef.current.style.left = `${newX}px`;
        modalRef.current.style.top = `${newY}px`;
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove as React.FC);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as React.FC);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  return (
    <div
      ref={modalRef}
      onMouseDown={handleMouseDown}
      className="flex overflow-x-hidden overflow-y-auto fixed outline-none focus:outline-none inset-0 z-50"
    >
      <div className="darggable w-80 h-[500px] ml-32 my-auto border rounded-2xl bg-gray-100">
        <div className="flex items-center p-4 justify-center rounded-t-2xl relative border-b-[1px] border-gray-300 bg-emerald-400">
          <button
            onClick={() => {}}
            className="p-1 border-0 hover:opacity-70 transition absolute left-9"
          >
            <IoArrowBack size={25} />
          </button>
          <h2 className="text-xl">채팅하기</h2>
          <button
            onClick={onToggle}
            className="p-1 border-0 hover:opacity-70 transition absolute right-9"
          >
            <IoClose size={25} />
          </button>
        </div>
        {/* 유저 목록 */}
        <div>
          <ul className="cursor-pointer">
            {testUser.map((user, idx) => (
              <li key={`${user.id} + ${idx}`} className=" border-b">
                <div className="bg-white w-auto h-20 flex flex-row px-4">
                  <div className="flex justify-center items-center w-auto h-auto">
                    <img
                      src="https://i.pinimg.com/originals/d2/4f/89/d24f89d6afaec9d3a55d47fed799800e.jpg"
                      alt="profile_image"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col overflow-hidden pl-4 justify-center w-60">
                    <p className="h-6">{user.name}</p>
                    <p className="overflow-ellipsis line-clamp-3 w-60 h-6">
                      {user.id} 마지막에 나오는 미ㅏ러민아러ㅣㅁㄴ아러미낭러미낭
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* 
        <div>
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
        </div>
        <div className="join flex w-auto">
          <input
            className="input input-bordered join-item"
            placeholder="Text..."
          />
          <button className="join-item px-3 bg-emerald-600 rounded-5">
            전송
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ChatModal;
