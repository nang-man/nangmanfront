// User Information
import { useState } from "react";
import MyFriendCard from "@/app/mypage/MyFriendCard";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import userAvatar from "@/assets/user.png";
import { user } from "@/apis/user";

const dummyData = {
  name: "김낭만",
  image: userAvatar,
};

const MyPageInfo = () => {
  const [more, setMore] = useState(false);
  //  const userData = user({ name: "test" });

  const onToggleMore = () => setMore((prev) => !prev);
  return (
    <section className="m-auto w-auto h-auto">
      <figure className="flex mt-12 justify-items-end items-end gap-5">
        <div className="bg-gray-400 rounded-full border-2 w-32 h-32 overflow-hidden">
          <img alt="avatar" src={userAvatar} />
        </div>
        <figcaption className="text-lg font-semibold">
          <h3>홍길동</h3>
          <h3>user123@naver.com</h3>
        </figcaption>
      </figure>
      <div className="mt-32 h-auto">
        <h3 className="text-lg font-semibold">친구 목록</h3>
        <ul className="flex gap-5 mt-5 w-full h-auto items-center justify-center">
          <MyFriendCard name={dummyData.name} image={dummyData.image} />
          <MyFriendCard name={dummyData.name} image={dummyData.image} />
          <MyFriendCard name={dummyData.name} image={dummyData.image} />
          <button
            className="flex items-center text-sm text-neutral-500"
            onClick={onToggleMore}
          >
            {more ? (
              <>
                더보기 <FaAngleUp className="ml-1" />
              </>
            ) : (
              <>
                더보기 <FaAngleDown className="ml-1" />
              </>
            )}
          </button>
        </ul>

        {more && (
          <ul className="w-full h-1/3 mt-5 overflow-scroll scrollbar-hidden">
            <li className="flex gap-2 mb-3">
              <h4 className="font-semibold">이낭만</h4>
              <button>
                <FaTrashAlt className="hover:text-blue-600" />
              </button>
            </li>
            <li className="flex gap-2 mb-3">
              <h4 className="font-semibold">이낭만</h4>
              <button>
                <FaTrashAlt className="hover:text-blue-600" />
              </button>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default MyPageInfo;
