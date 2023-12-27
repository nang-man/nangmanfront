import React, { useRef, useState, useEffect, useCallback } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";

import { getStorage } from "@/data/storage";
import { socket } from "@/data/socket.ts";
import { useAppDispatch } from "@/store/hooks";
import { toggleModal } from "@/store/modalSlice";
import { TYPE_CHAT } from "@/store/types";
import { SocketMessage, Messages } from "@/types/index";

import ChatModalUserList from "./ChatModalUserList";
import ChatModalRoom from "./ChatModalRoom";

const testUser = [
  {
    id: "test1",
    name: "차범근",
    src: "https://mblogthumb-phinf.pstatic.net/20160509_223/new6791_1462780191348fftry_JPEG/image_kimhw85.jpg?type=w2",
  },
  {
    id: "test2",
    name: "손흥민",
    src: "https://cdn.sideview.co.kr/news/photo/202211/10746_9173_3737.jpg",
  },
  {
    id: "test3",
    name: "박지성",
    src: "https://t1.daumcdn.net/cfile/tistory/1845D64C4EF8EE4C01",
  },
];

const ChatModal = () => {
  /* Drag Modal */

  const modalRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState<number | null>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const onCloseModal = () =>
    dispatch(toggleModal({ type: TYPE_CHAT, isOpen: false }));

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffsetX(
      e.clientX - (modalRef.current?.getBoundingClientRect().left || 0)
    );
    setOffsetY(
      e.clientY - (modalRef.current?.getBoundingClientRect().top || 0)
    );
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - (offsetX || 0);
        const newY = e.clientY - (offsetY || 0);

        if (modalRef.current) {
          modalRef.current.style.left = `${newX}px`;
          modalRef.current.style.top = `${newY}px`;
        }
      }
    },
    [isDragging, offsetX, offsetY, modalRef]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove as React.FC);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as React.FC);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const currentUser = getStorage();
  const [selectUserId, setSelectUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [joinChat, setJoinChat] = useState(false);

  const socketMessage = (data: SocketMessage) => {
    console.log(data.message);
  };

  const updateReceiveMessage = (data: Messages) => {
    const { curName, userId, profileImg } = currentUser;

    const messageData: Messages = {
      isUser: true,
      name: curName,
      id: userId,
      message: data.message,
      time: data.time,
      img: profileImg,
    };

    setMessages((prev) => [...prev, messageData]);
  };

  useEffect(() => {
    socket.on("joinChatRoom", socketMessage);
    socket.on("leaveChatRoom", socketMessage);

    setJoinChat(true);
  }, []);

  const handleUserClick = useCallback(
    (userId: string) => {
      setSelectUserId(userId);
      socket.emit("joinRoom", selectUserId);
    },
    [setSelectUserId, selectUserId]
  );

  const leaveRoom = useCallback(() => {
    socket.emit("leaveChatRoom", {
      name: currentUser.curName,
      userId: currentUser.userId,
    });
  }, [currentUser]);

  const handleGoBack = useCallback(() => {
    setSelectUserId(null);
    leaveRoom();
  }, [setSelectUserId, leaveRoom]);

  return (
    <div
      ref={modalRef}
      onMouseDown={handleMouseDown}
      className="flex overflow-x-hidden overflow-y-auto fixed outline-none focus:outline-none inset-0 z-50 w-80 h-[500px]"
    >
      <div className="darggable w-80 h-[500px] my-auto border rounded-2xl bg-gray-100">
        <header className="flex items-center p-4 justify-center rounded-t-2xl relative border-b-[1px] border-gray-300 bg-emerald-400">
          <button
            onClick={handleGoBack}
            className="p-1 border-0 hover:opacity-70 transition absolute left-9"
          >
            <IoArrowBack size={25} />
          </button>
          <h2 className="text-xl">채팅하기</h2>
          <button
            onClick={onCloseModal}
            className="p-1 border-0 hover:opacity-70 transition absolute right-9"
          >
            <IoClose size={25} />
          </button>
        </header>
        {/* 유저 목록 */}
        {!currentUser ? (
          <article className="flex justify-center items-center h-4/5">
            현재 팔로워 중인 유저가 없습니다.
          </article>
        ) : (
          <article>
            {selectUserId === null ? (
              <ChatModalUserList
                fllowers={testUser}
                onUserClick={(userId: string) => handleUserClick(userId)}
              />
            ) : (
              <ChatModalRoom
                fllowers={testUser.filter((user) => user.id === selectUserId)}
                userId={selectUserId}
                socket={socket}
                messages={messages}
                joinChat={joinChat}
                updateReceiveMessage={updateReceiveMessage}
              />
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default ChatModal;
