import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
// import gsap from "gsap";
// import { ScrollTrigger } from "react-gsap";
// import { useGSAP } from "@gsap/react";

const Main = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<string | undefined>("");

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isGuest === "") {
      setIsGuest(uuid());
    }

    setIsClick(!isClick);

    navigate("/list");
  };

  return (
    <main className="text-gray-600 body-font">
      <section className="w-[100dvw] h-[100dvh] py-60 bg-slate-600">
        <div className="text-center mb-20">
          <h1 className="sm:text-5xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
            Nang-man Chatting
          </h1>
          <p className="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-300">
            낭만 가득한 사람들과의 만남
          </p>
        </div>
        <button
          onClick={handleButtonClick}
          className="flex mx-auto mt-16 text-white bg-emerald-500 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg"
        >
          시작하기
        </button>
      </section>
    </main>
  );
};

export default Main;
