import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import Main from "../app/main/Main";
import List from "../app/list/List";
import Chat from "../app/chat/Chat";
import MyPage from "@/app/mypage/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<Layout />}>
          <Route path="/list" element={<List />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mypage/*" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
