// Update user data
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { checkUserPhone } from "@/store/modalSlice";
import { logout } from "@/apis/auth";

interface IFormData {
  image: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

// Style
const listStyle =
  "grid relative m-auto items-center grid-cols-3-7 font-semibold pl-5 py-3 border-b-2";

const inputStyle = "input input-bordered w-full max-w-xs font-normal";

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
    // console.log(data);
    dispatch(checkUserPhone({ isCheck: true }));
  };

  const onModalToggle = () => navigate("/mypage/update/password");

  const onDeleteUser = () => {};
  const onToggleSetting = () => setIsUserWithdrawal((prev) => !prev);

  const onGoMyPage = () => {
    navigate("/mypage");
    //  dispatch(checkUserPhone({ isCheck: false }));
  };

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate("/list", { replace: true });
      logout();
    }
  };
  // console.log(watch().password);

  const passwordStyle = errors.password
    ? " text-rose-500 focus:border-rose-500"
    : " focus:input-bordered";

  return (
    <section className="m-auto w-[40%] min-w-[400px] h-full justify-center items-center select-none">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-20" id="updateForm">
        <h2 className="font-semibold py-7 text-[1.1rem]">프로필 변경</h2>
        <ul className="bg-white border-2 rounded-md">
          <li className={listStyle}>
            <h4>프로필</h4>
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
              // defaultValue={userInfo.img}
              className="hidden"
              form="updateForm"
            />
          </li>
          <li className={listStyle}>
            <label htmlFor="name">닉네임</label>
            <input
              id="name"
              type="text"
              defaultValue={userInfo.name}
              {...register("name", { required: "Please enter your name." })}
              className={inputStyle}
              form="updateForm"
            />
          </li>
          {isPhoneChecked && (
            <>
              <li className={listStyle}>
                <label htmlFor="password">비밀번호</label>
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
                  className={inputStyle + passwordStyle}
                  form="updateForm"
                />
                {/* <p className="text-red-600 absolute bottom-0 right-0 font-normal text-sm">
                  {errors.password?.message}
                </p> */}
              </li>
              <li className={listStyle}>
                <label htmlFor="password">비밀번호 확인</label>
                <input
                  id="passwordConfirm"
                  type="password"
                  {...register("passwordConfirm", {
                    required: "Please confirm your password",
                  })}
                  placeholder="password confirmation"
                  className={inputStyle + passwordStyle}
                  form="updateForm"
                />
              </li>
            </>
          )}
        </ul>
        {!isPhoneChecked && (
          <button
            onClick={onModalToggle}
            className="font-semibold block mt-8 text-gray-800 text-[1.1rem] hover:text-gray-500"
          >
            비밀번호 변경
          </button>
        )}
        <div className="float-right">
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
