import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex ml-20 pl-16 pt-16 w-screen h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
