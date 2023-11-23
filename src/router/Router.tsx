import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";

import Main from "@/app/main/Main";
import List from "@/app/list/List";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<Layout />}>
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
