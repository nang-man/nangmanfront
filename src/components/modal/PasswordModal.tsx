import { useState } from "react";
import Modal from "@/components/modal/Modal";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkUserPhone } from "@/store/modalSlice";

const PasswordModal = () => {
  const isPhoneChecked = useAppSelector(
    (state) => state.modalState.isPhoneCheck
  );
  const [phoneNum, setPhoneNum] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [submitCode, setSubmitCode] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSendCode = () => {
    //Send

    setIsSend(true);
  };
  const onCencel = () => navigate("/mypage/update", { replace: true });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    if (id === "phone") {
      setPhoneNum(value);
    } else {
      setSubmitCode(value);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(checkUserPhone({ isCheck: true }));

    navigate("/mypage/update", { replace: true });
  };

  const style =
    "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:bg-gray-200 disabled:cursor-not-allowed";

  const bodyContent = (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
          disabled={!isSend}
          value={submitCode}
          onChange={onChangeInput}
          className={style}
          placeholder="Please enter your code."
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
          onClick={onCencel}
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
      onClose={onCencel}
      title="Change Password"
      body={bodyContent}
    />
  );
};

export default PasswordModal;
