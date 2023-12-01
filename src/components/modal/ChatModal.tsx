import React, { useRef, useState, useEffect } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";

import ChatModalUserList from "./ChatModalUserList";
import ChatModalRoom from "./ChatModalRoom";

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
  const [selectUserId, setSelectUserId] = useState<number | null>(null);

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

  const handleUserClick = (userId: number) => {
    setSelectUserId(userId);
  };

  const handleGoBack = () => {
    setSelectUserId(null);
  };
  return (
    <div
      ref={modalRef}
      onMouseDown={handleMouseDown}
      className="flex overflow-x-hidden overflow-y-auto fixed outline-none focus:outline-none inset-0 z-50"
    >
      <div className="darggable w-80 h-[500px] ml-32 my-auto border rounded-2xl bg-gray-100">
        <header className="flex items-center p-4 justify-center rounded-t-2xl relative border-b-[1px] border-gray-300 bg-emerald-400">
          <button
            onClick={handleGoBack}
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
        </header>
        {/* 유저 목록 */}
        {selectUserId === null ? (
          <ChatModalUserList
            users={testUser}
            onUserClick={(userId: number) => handleUserClick(userId)}
          />
        ) : (
          <ChatModalRoom
            users={testUser.filter((user) => user.id === selectUserId)}
          />
        )}
      </div>
    </div>
  );
};

export default ChatModal;
