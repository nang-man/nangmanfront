import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CgAddR, CgUser } from "react-icons/cg";
import { IoChatboxEllipsesOutline, IoSettingsOutline } from "react-icons/io5";

import Avatar from "@components/Avatar";
import SignupModal from "@components/modal/SignupModal";
import LoginModal from "@components/modal/LoginModal";
import CreateChatModal from "@components/modal/CreateChatModal";
import ChatModal from "@components/modal/ChatModal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleModal } from "@/store/modalSlice";
import {
  TModalType,
  TYPE_CHAT,
  TYPE_CREATE,
  TYPE_LOGIN,
  TYPE_SIGNUP,
} from "@/store/types";

const Navbar = React.memo(() => {
  const selector = useAppSelector((state) => state.currentUser);
  const modalState = useAppSelector((state) => state.modalState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(selector);
  }, [selector]);

  const onOpenModal = (type: TModalType) =>
    dispatch(toggleModal({ type, isOpen: true }));

  return (
    <>
      <div className="flex bg-gray-100 text-gray-900 fixed">
        <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
          <div className="flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2">
            <Link to="/list">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsapwuIZ2JPUVRaWSoX_xoEIOHWxneY7EupS8gsFriA&s" />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col gap-y-4 pt-10">
            <button
              onClick={() => onOpenModal(TYPE_CREATE)}
              className="group relative rounded-xl bg-gray-100 p-2 hover:text-blue-600 hover:bg-gray-50"
            >
              <CgAddR size={30} />
              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  Live Streem
                </div>
              </div>
            </button>
            <button
              onClick={() => onOpenModal(TYPE_LOGIN)}
              className="text-gary-400 group relative rounded-xl p-2 hover:text-blue-600 hover:bg-gray-50"
            >
              <CgUser size={30} />

              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  User
                </div>
              </div>
            </button>
            <button
              onClick={() => onOpenModal(TYPE_CHAT)}
              className="text-gary-400 group relative rounded-xl p-2 hover:text-blue-600 hover:bg-gray-50"
            >
              <IoChatboxEllipsesOutline size={30} />

              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  Chat
                </div>
              </div>
            </button>
            <a
              href="#"
              className="text-gary-400 group relative rounded-xl p-2 hover:text-blue-600 hover:bg-gray-50"
            >
              <IoSettingsOutline size={30} />

              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  Dark Mode
                </div>
              </div>
            </a>
          </nav>

          <div className="flex flex-col items-center gap-y-4 py-10">
            <button
              onClick={() => onOpenModal(TYPE_SIGNUP)}
              className="mt-2 rounded-full bg-gray-100 relative group"
            >
              <Avatar src="" height="[30px]" width="[30px]" />
              <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 drop-shadow-lg">
                  <div className="absolute inset-0 -left-1 flex items-center">
                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 border-b">
                    Username
                  </p>
                  <p className="text-sm font-semibold text-gray-900">email</p>
                </div>
              </div>
            </button>
          </div>
        </aside>
      </div>
      {modalState.login && <LoginModal />}
      {modalState.signup && <SignupModal />}
      {modalState.create && <CreateChatModal />}
      {modalState.chat && <ChatModal />}
    </>
  );
});

export default Navbar;
