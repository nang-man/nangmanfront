import React, { useState } from "react";
import Modal from "@/components/modal/Modal";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { checkUserPhone } from "@/store/modalSlice";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@components/Input";

const PasswordModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      phone: "",
      code: "",
      password: "",
      matchPassword: "",
    },
  });
  const [phoneNum, setPhoneNum] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const [code, setCode] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSendCode = () => {
    //Send

    setIsSend(true);
  };

  const onCheckCode = () => {
    //Send
    console.log(watch("code"));
    setIsPhoneChecked(true);
    // if (code) {
    //   setIsPhoneChecked(true);
    // }
  };

  const onCancel = () => navigate("/mypage/update", { replace: true });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    console.log(errors);
    // dispatch(checkUserPhone({ isCheck: true }));
    // navigate("/mypage/update", { replace: true });
  };

  const style =
    "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:bg-gray-200 disabled:cursor-not-allowed";

  const bodyContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {isPhoneChecked ? (
        <>
          <h2 className="font-semibold text-lg">비밀번호를 입력해주세요.</h2>
          <div>
            <Input
              id="password"
              label="password"
              actionLabel="이메일 형식"
              register={register}
              errors={errors}
              required
            />
            <p className="text-red-600 font-normal text-sm">
              {/* {errors.code} */}
            </p>
          </div>
          <div>
            <Input
              id="matchPassword"
              label="password confirmation"
              actionLabel="이메일 형식"
              register={register}
              errors={errors}
              required
            />
            <p className="text-red-600 font-normal text-sm">
              {/* {errors.passwordConfirm?.message} */}
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-semibold text-lg">전화번호를 입력해주세요.</h2>
          <div className="grid grid-cols-7-3 gap-[5%]">
            <Input
              id="phone"
              label="phone"
              actionLabel="이메일 형식"
              register={register}
              errors={errors}
              required
              disabled={isPhoneChecked}
            />
            <button
              onClick={isPhoneChecked ? undefined : onSendCode}
              disabled={isPhoneChecked}
              className={`${
                isPhoneChecked ? "bg-slate-400" : "bg-emerald-500"
              } text-white rounded-md`}
            >
              전송
            </button>
          </div>
          <div className="grid grid-cols-7-3 gap-[5%]">
            <input
              disabled={!isSend}
              type="text"
              // className={style}
              {...register("code", {
                required: "Please enter your code.",
                minLength: {
                  value: 5,
                  message: "Code must be at least 5 characters",
                },
              })}
            />
            <button
              onClick={onCheckCode}
              className="bg-emerald-500 text-white rounded-md"
            >
              확인
            </button>
          </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-[3%] font-semibold">
        <button
          type={isPhoneChecked ? "submit" : "button"}
          onClick={isPhoneChecked ? undefined : onCheckCode}
          className="bg-emerald-500 text-white rounded-md p-4 pt-6  hover:bg-emerald-600"
        >
          확인
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 p-4 pt-6 rounded-md hover:bg-gray-300"
        >
          취소
        </button>
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Change Password"
      body={bodyContent}
      actionLabel=""
    />
  );
};

export default PasswordModal;
