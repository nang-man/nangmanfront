import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "react-gsap";
import { useGSAP } from "@gsap/react";

const Main = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<string | undefined>("");

  const divRef1 = useRef<HTMLDivElement | null>(null);
  const divRef2 = useRef<HTMLDivElement | null>(null);
  const divRef3 = useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isGuest === "") {
      setIsGuest(uuid());
    }

    setIsClick(!isClick);

    navigate("/list");
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const firstDiv = divRef1.current;
    const secondDiv = divRef2.current;

    gsap.to(firstDiv, {
      x: 500,
      duration: 1,
      rotation: 360,
      scrollTrigger: {
        trigger: firstDiv,
        toggleActions: "play none none none",
      },
    });
    gsap.to(secondDiv, {
      x: -500,
      duration: 2,
      rotation: 360,
      scrollTrigger: {
        trigger: secondDiv,
        toggleActions: "play none none none",
      },
    });
  }, [divRef1, divRef3]);

  const { contextSafe } = useGSAP({ scope: divRef3 });

  const onClick = contextSafe(() => {
    gsap.to(divRef3.current, {
      rotation: 360,
    });
  }) as React.FC;

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
      <section className="w-[100dvw] h-[100dvh] flex justify-center items-center bg-orange-400">
        <div className="w-[100px] h-[100px] border" ref={divRef1}>
          123
        </div>
      </section>
      <section className="w-[100dvw] h-[100dvh] flex justify-center items-center bg-zinc-700">
        <div className="w-[100px] h-[100px] border" ref={divRef2}>
          123
        </div>
      </section>
      <section className="w-[100dvw] h-[100dvh] flex justify-center items-center bg-red-300">
        <button
          className="w-[100px] h-[100px] border"
          onClick={onClick}
          ref={divRef3}
        >
          123
        </button>
      </section>
    </main>
  );
};

export default Main;
