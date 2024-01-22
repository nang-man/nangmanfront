import React, { useEffect } from "react";
import Avatar from "@components/Avatar";
import { FaTrashAlt } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleModal } from "@/store/modalSlice";
import { TYPE_CHAT } from "@/store/types";

interface IMyFriendCard {
  name: string;
  image?: string;
  userId?: string;
  email?: string;
}

const MyFriendCard = ({ name, image, userId, email }: IMyFriendCard) => {
  const dispatch = useAppDispatch();
  const onGoChat = () => {
    if (window.confirm("메시지를 전달하시겠습니까?")) {
      // 해당 아이디의 채팅 방으로 연결하기
      dispatch(toggleModal({ type: TYPE_CHAT, isOpen: true }));
    }
  };
  const onDelete = () => {
    if (window.confirm("친구를 삭제하시겠습니까?")) {
      //
    }
  };

  return (
    <li className="w-full h-auto max-h-[80px] flex justify-between bg-white border-2 rounded-md py-2 px-3">
      <article className="flex">
        {image && (
          <div className="bg-gray-400 rounded-full border-2 overflow-hidden">
            <Avatar
              src={image}
              profileSize={"w-[3.5em] h-[3.5em]"}
              name={name}
            />
          </div>
        )}
        <figcaption className="ml-5 flex flex-col gap-1 justify-center">
          <h5 className="font-semibold">{name}</h5>
          {email && <h6 className="text-[0.9em]">{email}</h6>}
        </figcaption>
      </article>
      <div className="flex justify-center items-center">
        <button
          onClick={onGoChat}
          className="h-8 w-12 flex  justify-center items-center border-gray-300 border-2 rounded-md text-lg transition-transform hover:bg-gray-100 mr-2 hover:text-emerald-600"
        >
          <IoChatboxEllipsesOutline />
        </button>
        <button
          onClick={onDelete}
          className="h-8 w-12 flex  justify-center items-center border-gray-300 border-2 text-[0.9em] rounded-md transition-transform hover:bg-gray-100 hover:text-red-600"
        >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default MyFriendCard;
