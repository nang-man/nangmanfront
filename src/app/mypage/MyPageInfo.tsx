// User Information
import { useState } from "react";
import MyFriendCard from "@/app/mypage/MyFriendCard";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import userAvatar from "@/assets/user.png";
import { useAppSelector } from "@/store/hooks";

const dummyData = {
  name: "김낭만",
  image: userAvatar,
};

const MyPageInfo = () => {
  const [more, setMore] = useState(false);
  const userInfo = useAppSelector((state) => state.currentUser);

  const onToggleMore = () => setMore((prev) => !prev);

  return (
    <section className="m-auto w-auto h-auto">
      <figure className="flex mt-12 justify-items-end items-end gap-5">
        <div className="bg-gray-400 rounded-full border-2 w-32 h-32 overflow-hidden">
          <img alt="avatar" src={userAvatar} />
        </div>
        <figcaption className="text-lg font-semibold">
          <h3>{userInfo.name}</h3>
          <h3>{userInfo.email}</h3>
        </figcaption>
      </figure>
      <div className="mt-32 h-auto">
        <h3 className="text-lg font-semibold">친구 목록</h3>
        <ul className="flex gap-5 mt-5 w-full h-auto items-center justify-center">
          {/* {userInfo.followers.slice(0,3).map(friend=><MyFriendCard name={friend.name} image={friend.image} />)} */}
          {userInfo.followers ? (
            <>
              <MyFriendCard name={dummyData.name} image={dummyData.image} />
              <MyFriendCard name={dummyData.name} image={dummyData.image} />
              <MyFriendCard name={dummyData.name} image={dummyData.image} />
            </>
          ) : (
            "친구를 추가해주세요."
          )}
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
