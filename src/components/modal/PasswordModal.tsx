import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "@/components/modal/Modal";
import { toggleModal } from "@/store/modalSlice";
import { TYPE_PHONE } from "@/store/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const PasswordModal = () => {
  const [phoneNum, setPhoneNum] = useState("");
  const [submitCode, setSubmitCode] = useState("");

  const modalState = useAppSelector((state) => state.modalState.isPhoneCheck);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSendCode = () => {};
  const onCancel = () => navigate("/mypage/update", { replace: true });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    if (id === "phone") {
      setPhoneNum(value);
    } else {
      setSubmitCode(value);
    }
  };

  const onSubmit = () => {
    dispatch(toggleModal({ type: TYPE_PHONE, isOpen: false }));
    // setIsChecked((prev) => ({
    //   ...prev,
    //   phoneCheck: true,
    // }));

    navigate("/mypage/update", { replace: true });
  };

  const style =
    "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed";

  const bodyContent = (
    <form id="passwordForm" className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg">전화번호를 입력해주세요.</h2>
      <div className="grid grid-cols-7-3 gap-5">
        <input
          id="phone"
          type="text"
          minLength={11}
          required
          value={phoneNum}
          onChange={onChangeInput}
          className={style}
          placeholder="Please enter your phone number."
          form="passwordForm"
        />
        <button
          onClick={onSendCode}
          className="bg-emerald-500 text-white rounded-md"
        >
          전송
        </button>
      </div>
      <div className="grid grid-cols-7-3 gap-[5%]">
        <input
          type="text"
          minLength={5}
          required
          value={submitCode}
          onChange={onChangeInput}
          className={style}
          placeholder="Please enter your code."
          form="passwordForm"
        />
      </div>
      <div className="grid grid-cols-2 gap-[3%] font-semibold">
        <button
          type="submit"
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
      isOpen={modalState}
      onClose={onCancel}
      title="Change Password"
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel=""
    />
  );
};

export default PasswordModal;
