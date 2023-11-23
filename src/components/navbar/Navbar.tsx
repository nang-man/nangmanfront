import { CgAddR, CgUser } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

import { useCreateModal } from "@/hooks/useCreateModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useSignupModal } from "@/hooks/useSignupModal";

import SignupModal from "../modal/SignInModal";
import LoginModal from "../modal/LoginModal";
import CreateChatModal from "../modal/CreateChatModal";

const Navbar = () => {
  const createModal = useCreateModal();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();

  return (
    <>
      <div className="flex bg-gray-100 text-gray-900 fixed">
        <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
          <div className="flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsapwuIZ2JPUVRaWSoX_xoEIOHWxneY7EupS8gsFriA&s" />
          </div>
          <nav className="flex flex-1 flex-col gap-y-4 pt-10">
            <button
              onClick={createModal.onOpen}
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
              onClick={loginModal.onOpen}
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
                  Settings
                </div>
              </div>
            </a>
          </nav>

          <div className="flex flex-col items-center gap-y-4 py-10">
            <button
              onClick={signupModal.onOpen}
              className="mt-2 rounded-full bg-gray-100 relative group"
            >
              <img
                className="h-10 w-10 rounded-full"
                src="https://avatars.githubusercontent.com/u/35387401?v=4"
                alt=""
              />
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
      {loginModal.isOpen.isOpen && <LoginModal />}
      {signupModal.isOpen.isOpen && <SignupModal />}
      {createModal.isOpen.isOpen && <CreateChatModal />}
    </>
  );
};

export default Navbar;
