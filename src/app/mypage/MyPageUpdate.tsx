// Update user data
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { checkUserPhone } from "@/store/modalSlice";
import { logout } from "@/apis/auth";
import { FaArrowRight } from "react-icons/fa";
import { updateUsers } from "@/apis/user";

interface IFormData {
  image: FileList;
  name: string;
  phone: number;
  password: string;
  passwordConfirm: string;
}

// Style
const listStyle =
  "grid relative m-auto items-center grid-cols-3-7 font-semibold pl-5 py-3 border-b-2";

const inputStyle = "input input-bordered w-full max-w-xs font-normal";
const errorStyle = " text-rose-500 focus:border-rose-500";

const MyPageUpdate = React.memo(() => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>();

  const userInfo = useAppSelector((state) => state.currentUser);
  const isPhoneChecked = useAppSelector(
    (state) => state.modalState.isPhoneCheck
  );

  const [isUserWithdrawal, setIsUserWithdrawal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatarImg = watch("image");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    updateUsers({
      userId: userInfo.userId,
      name: data.name,
      profileImg: data.image,
      phone: String(data.phone),
    });

    navigate("/mypage", { replace: true });
  };

  // Go to Password update modal
  const onModalToggle = () => navigate("/mypage/update/password");

  const onDeleteUser = () => {};
  const onToggleSetting = () => setIsUserWithdrawal((prev) => !prev);

  const onGoMyPage = () => {
    navigate("/mypage");
    dispatch(checkUserPhone({ isCheck: false }));
  };

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate("/list", { replace: true });
      logout();
    }
  };

  return (
    <section className="m-auto w-[40%] min-w-[400px] h-full justify-center items-center select-none">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-20" id="updateForm">
        <h2 className="font-semibold py-7 text-[1.1rem]">프로필 변경</h2>
        <ul className="border-2 rounded-md bg-white">
          <li className={listStyle}>
            <h4>프로필</h4>
            <label
              htmlFor="image"
              className="bg-gray-400 rounded-full border-2 w-32 h-32 overflow-hidden cursor-pointer transition hover:border-spacing-10 hover:border-emerald-500"
            >
              <img
                alt="avatar"
                src={avatarPreview ? avatarPreview : userInfo.profileImg}
              />
            </label>
            <input
              id="image"
              type="file"
              {...register("image")}
              // defaultValue={userInfo.profileImg}
              className="hidden"
            />
          </li>
          <li className={listStyle}>
            <label htmlFor="name">닉네임</label>
            <div>
              <input
                id="name"
                type="text"
                defaultValue={userInfo.name}
                {...register("name", {
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long.",
                  },
                  required: "Please enter your name.",
                })}
                className={`${inputStyle} ${errors.name ? errorStyle : ""}`}
              />
              <p className="text-red-600 font-normal text-sm">
                {errors.name?.message}
              </p>
            </div>
          </li>
          <li className={listStyle}>
            <label htmlFor="phone">전화번호</label>
            <div>
              <input
                id="phone"
                type="number"
                defaultValue={userInfo.phone}
                {...register("phone", {
                  minLength: {
                    value: 11, // 한국기준
                    message: "phone must be at least 2 characters long.",
                  },
                  required: "Please enter your phone.",
                })}
                className={`${inputStyle} ${errors.phone ? errorStyle : ""}`}
              />
              <p className="text-red-600 font-normal text-sm">
                {errors.phone?.message}
              </p>
            </div>
          </li>
        </ul>

        {/* Updata password */}
        {!isPhoneChecked && (
          <button
            onClick={onModalToggle}
            className="group/btnIcon font-semibold block mt-8 text-gray-800 text-[1.1rem] hover:text-gray-500"
          >
            비밀번호 변경
            <FaArrowRight className="inline-block translate-y-[-3px] ml-2 group-hover/btnIcon:translate-x-2" />
          </button>
        )}
        <div className="float-right">
          <button
            className="btn bg-emerald-500 text-white hover:bg-emerald-600 mt-8 mr-3"
            type="submit"
          >
            수정하기
          </button>
          <button
            className="btn bg-gray-400 text-white hover:bg-red-500 mt-5"
            onClick={onGoMyPage}
          >
            취소
          </button>
        </div>
      </form>
      <div className="absolute top-5 right-5 flex flex-col items-end">
        <IoSettingsOutline
          onClick={onToggleSetting}
          className="text-2xl text-slate-600 cursor-pointer hover:text-blue-600"
        />
        {isUserWithdrawal && (
          <div className="flex flex-col gap-4 bg-white mt-3 rounded-md px-5 py-5 text-sm font-semibold text-slate-800 shadow-md">
            <button onClick={onDeleteUser} className="hover:text-slate-600">
              회원 탈퇴
            </button>
            <hr />
            <button onClick={onLogout} className="hover:text-slate-600">
              로그아웃
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

export default MyPageUpdate;
