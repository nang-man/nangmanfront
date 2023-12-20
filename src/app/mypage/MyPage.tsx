// MyPage
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import MyPageInfo from "./MyPageInfo";
import MyPageUpdate from "./MyPageUpdate";
import PasswordModal from "@components/modal/PasswordModal";

const MyPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const navigation = useNavigate();

  const data = useParams();

  useEffect(() => {
    if (data["*"] === "update" && !isEdit) {
      setIsEdit(true);
    } else if (data["*"] === "" && isEdit) {
      setIsEdit(false);
    }
  }, [data, isEdit]);

  const onToggleMenu = (path: string, bool: boolean) => {
    if (bool === isEdit) return;
    setIsEdit(bool);
    navigation(path);
  };

  return (
    <section className="w-[93vw] h-[95vh] max-w-[1440px] m-auto">
      <div className="flex w-[100%] h-20 p-5">
        <button
          onClick={() => onToggleMenu("/mypage/", false)}
          className={`text-2xl border-r-2 pr-5 font-semibold ${
            isEdit ? "text-gray-400 hover:text-gray-800" : ""
          }`}
        >
          나의 정보
        </button>
        <button
          onClick={() => onToggleMenu("/mypage/update", true)}
          className={`text-2xl font-semibold mx-4 ${
            !isEdit ? "text-gray-400 hover:text-gray-800" : ""
          }`}
        >
          정보 수정
        </button>
      </div>
      <div className="card border-2 bg-gray-50 shadow-lg w-auto h-[85%] p-5">
        <Routes>
          <Route path="/" element={<MyPageInfo />} />
          <Route path="/update" element={<MyPageUpdate />} />
          <Route path="/update/password" element={<PasswordModal />} />
        </Routes>
      </div>
    </section>
  );
};

export default MyPage;
