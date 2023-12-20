// User Information
import { useState } from "react";
import MyFriendCard from "@/app/mypage/MyFriendCard";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import userAvatar from "@/assets/user.png";
import { useAppSelector } from "@/store/hooks";

const MyPageInfo = () => {
  const [more, setMore] = useState(false);
  const userInfo = useAppSelector((state) => state.currentUser);

  const onToggleMore = () => setMore((prev) => !prev);

  return (
    <section className="h-auto w-[50%] mx-auto min-w-[400px] py-5 px-5 overflow-scroll scrollbar-hidden">
      <figure className="flex gap-10 mt-10">
        <div className="bg-gray-400 rounded-full border-2 w-[12em] h-[12em] overflow-hidden">
          <img alt="avatar" src={userAvatar} />
        </div>
        <figcaption>
          <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
          <h3 className="text-xl font-semibold text-gray-600">
            {userInfo.email}
          </h3>
        </figcaption>
      </figure>
      <div className="mt-20 h-auto relative">
        <h3 className="text-[1.1em] font-semibold">친구 목록</h3>
        <button
          className="flex absolute top-0 right-0 items-center text-sm text-neutral-600"
          onClick={onToggleMore}
        >
          더보기
          {more ? (
            <FaAngleUp className="ml-1" />
          ) : (
            <FaAngleDown className="ml-1" />
          )}
        </button>
        <ul className="flex flex-col gap-3 mt-5 w-full h-[35vh]">
          {/* {userInfo.followers.slice(0,3).map(friend=><MyFriendCard name={friend.name} image={friend.image} />)} */}
          {userInfo.followers ? (
            <>
              <MyFriendCard
                name={"이름"}
                image={"image"}
                email="test@test.com"
              />
              <MyFriendCard
                name={"김낭만"}
                image={"image"}
                email="test@test.com"
              />
              <MyFriendCard
                name={"이름"}
                image={"image"}
                email="test@test.com"
              />
            </>
          ) : (
            "친구를 추가해주세요."
          )}

          {more && [1, 2, 3, 4].map(() => <MyFriendCard name={"이름"} />)}
        </ul>
      </div>
    </section>
  );
};

export default MyPageInfo;
