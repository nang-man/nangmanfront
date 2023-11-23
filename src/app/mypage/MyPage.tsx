// MyPage
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MyPageInfo from "./MyPageInfo";
import MyPageUpdate from "./MyPageUpdate";

const MyPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const navigation = useNavigate();

  const onToggleMenu = (path: string, bool: boolean) => {
    if (bool === isEdit) return;
    setIsEdit(bool);
    navigation(path);
  };

  return (
    <div className="w-4/5 h-4/5">
      <div className="flex p-5">
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
      <div className="card bg-gray-100 w-full h-full p-5">
        <Routes>
          <Route path="/" element={<MyPageInfo />} />
          <Route path="/update" element={<MyPageUpdate />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
