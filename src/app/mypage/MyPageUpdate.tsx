// Update user data
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  image: string;
  name: string;
  password: string;
};

const MyPageUpdate = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const navigation = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const onClick = () => {};
  const onGoMyPage = () => navigation("/mypage");

  return (
    <section className="m-auto h-full items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-10">
        <div className="flex flex-col items-center gap-5">
          <div className="bg-gray-400 rounded-full border-2 w-32 h-32">
            <img alt="avatar" src="" />
          </div>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-8 grid items-center grid-cols-3-7">
          <label htmlFor="name" className="font-semibold text-lg">
            이름 :
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-5 grid items-center grid-cols-3-7">
          <label htmlFor="password" className="font-semibold text-lg">
            비밀번호 :
          </label>
          <input
            id="password"
            type="text"
            {...register("password")}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
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
      <button
        className="font-semibold text-sm block mt-10 text-slate-600"
        onClick={onClick}
      >
        회원 탈퇴
      </button>
    </section>
  );
};

export default MyPageUpdate;
