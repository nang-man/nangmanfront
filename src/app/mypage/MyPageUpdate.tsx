// Update user data
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { checkUserPhone } from "@/store/modalSlice";
import { logout } from "@/apis/auth";
import { FaArrowRight } from "react-icons/fa";

interface IFormData {
  image: string;
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

  // 수정 이전의 데이터를 form에 넣기
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!userInfo) {
    navigate("/list");
  }

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    console.log(data);
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
              <img alt="avatar" src={userInfo.profileImg} />
            </label>
            <input
              id="image"
              type="file"
              {...register("image")}
              // defaultValue={userInfo.profileImg}
              className="hidden"
              form="updateForm"
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
                form="updateForm"
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
                form="updateForm"
              />
              <p className="text-red-600 font-normal text-sm">
                {errors.phone?.message}
              </p>
            </div>
          </li>
          {isPhoneChecked && (
            <>
              <li className={listStyle}>
                <label htmlFor="password">비밀번호</label>
                <div>
                  <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Please enter your phone number.",
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message:
                          "Password must be at least 8 characters and include both letters and numbers.",
                      },
                    })}
                    placeholder="password"
                    className={`${inputStyle} ${
                      errors.password ? errorStyle : ""
                    }`}
                    form="updateForm"
                  />
                  <p className="text-red-600 font-normal text-sm">
                    {errors.password?.message}
                  </p>
                </div>
              </li>
              <li className={listStyle}>
                <label htmlFor="password">비밀번호 확인</label>
                <div>
                  <input
                    id="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    placeholder="password confirmation"
                    className={`${inputStyle} ${
                      errors.passwordConfirm && errorStyle
                    }`}
                    form="updateForm"
                  />
                  <p className="text-red-600 font-normal text-sm">
                    {errors.passwordConfirm?.message}
                  </p>
                </div>
              </li>
            </>
          )}
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
