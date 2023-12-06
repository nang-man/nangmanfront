// Update user data
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

import { useRecoilState } from "recoil";
import { passwordModalState } from "@/hooks/modalState";

type FormData = {
  image: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

const MyPageUpdate = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [isPhoneChecked, setIsPhoneChecked] =
    useRecoilState(passwordModalState);
  const [isUserWithdrawal, setIsUserWithdrawal] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log(data);
  };

  const onModalToggle = () => navigate("/mypage/update/password");

  const onDeleteUser = () => {};
  const onToggleSetting = () => setIsUserWithdrawal((prev) => !prev);

  const onGoMyPage = () => {
    navigate("/mypage");
    setIsPhoneChecked((prev) => ({ ...prev, phoneCheck: false }));
  };

  return (
    <section className="m-auto h-full items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-20" id="updateForm">
        <div className="flex flex-col items-center gap-5">
          <label
            htmlFor="image"
            className="bg-gray-400 rounded-full border-2 w-32 h-32 overflow-hidden cursor-pointer transition hover:border-spacing-10 hover:border-emerald-500"
          >
            <img alt="avatar" src="" />
          </label>
          <input
            id="image"
            type="file"
            {...register("image")}
            className="hidden"
            form="updateForm"
          />
        </div>
        <div className="mt-8 grid items-center grid-cols-3-7">
          <label htmlFor="name" className="font-semibold text-lg">
            이름 :
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Please enter your name." })}
            className="input input-bordered w-full max-w-xs"
            form="updateForm"
          />
        </div>
        {!isPhoneChecked?.phoneCheck && (
          <button
            onClick={onModalToggle}
            className="font-semibold text-lg mt-8 text-gray-500 border-b-2 border-gray-500 hover:text-gray-700"
          >
            비밀번호 변경{" "}
          </button>
        )}
        <div className="mt-5 grid items-center">
          {isPhoneChecked?.phoneCheck && (
            <>
              <label htmlFor="password" className="font-semibold text-lg">
                비밀번호 :
              </label>
              <input
                id="password"
                type="text"
                {...register("password", {
                  required: "Please enter your phone number.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      "Password must be at least 8 characters and include both letters and numbers.",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
                form="updateForm"
              />
              <label htmlFor="password" className="font-semibold text-lg">
                비밀번호 확인 :
              </label>
              <input
                id="passwordConfirmation"
                type="text"
                {...register("passwordConfirmation", {
                  required: "Please confirm your password",
                })}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                form="updateForm"
              />
            </>
          )}
        </div>
        <button
          className="btn bg-emerald-500 hover:bg-emerald-600 mt-8 mr-3"
          type="submit"
        >
          수정하기
        </button>
        <button
          className="btn bg-gray-400 hover:bg-red-500 mt-5"
          onClick={onGoMyPage}
        >
          취소
        </button>
      </form>
      <div className="absolute top-5 right-5 flex flex-col items-end">
        <IoSettingsOutline
          onClick={onToggleSetting}
          className="text-2xl text-slate-600 cursor-pointer hover:text-blue-600"
        />
        {isUserWithdrawal && (
          <button
            className="bg-gray-300 py-2 px-3 font-semibold text-sm block mt-5 text-slate-600"
            onClick={onDeleteUser}
          >
            회원 탈퇴
          </button>
        )}
      </div>
    </section>
  );
};

export default MyPageUpdate;
