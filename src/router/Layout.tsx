import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex ml-[120px] pt-[5vh] w-screen h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
