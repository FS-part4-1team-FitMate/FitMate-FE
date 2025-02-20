import { useUser } from "@/contexts/UserProvider";
import { ic_fitness, ic_rehab, ic_sports, img_landing_02, logo_lg } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const card_title = clsx(
  "p-1 border border-blue-300 rounded-full",
  "text-blue-300 text-lg font-semibold bg-blue-100",
  "pc:text-2xl tablet:text-xl",
);
const card_description = "text-gray-400 text-sm font-normal pc:text-2lg tablet:text-2lg";
const card_img =
  "border border-blue-300 rounded-[1.6rem] p-4 w-[10rem] h-[10rem] pc:w-[25rem] pc:h-[25rem] tablet:w-[20rem] tablet:h-[20rem]";

export default function Home() {
  const router = useRouter();
  const user = useUser();

  const stickyRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const loginContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      if (user.role === "USER") {
        router.push("/user/my-lesson/lesson-history");
      } else if (user.role === "TRAINER") {
        router.push("/trainer/received-request");
      }
    }
  }, [user]);

  useEffect(() => {
    class CardFlipOnScroll {
      wrapper: HTMLElement;
      sticky: HTMLElement;
      cards: NodeListOf<HTMLElement>;
      length: number;
      start: number;
      end: number;
      step: number;

      constructor(wrapper: HTMLElement, sticky: HTMLElement) {
        this.wrapper = wrapper;
        this.sticky = sticky;
        this.cards = sticky.querySelectorAll(".card");
        this.length = this.cards.length;

        this.start = 0;
        this.end = 0;
        this.step = 0;
      }

      init() {
        if (!this.wrapper || !this.sticky) return;
        this.start = this.wrapper.offsetTop - 100;
        this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - window.innerHeight * 1.2;
        this.step = (this.end - this.start) / (this.length * 2);
      }

      animate() {
        this.cards.forEach((card, i) => {
          const s = this.start + this.step * i;
          const e = s + this.step * (this.length + 1);

          if (window.scrollY <= s) {
            card.style.transform = `
              perspective(100vw)
              translateX(100vw) 
              rotateY(180deg)
            `;
          } else if (window.scrollY > s && window.scrollY <= e - this.step) {
            card.style.transform = `
              perspective(100vw)
              translateX(${100 + ((window.scrollY - s) / (e - s)) * -100}vw)
              rotateY(180deg)
            `;
          } else if (window.scrollY > e - this.step && window.scrollY <= e) {
            card.style.transform = `
              perspective(100vw)
              translateX(${100 + ((window.scrollY - s) / (e - s)) * -100}vw)
              rotateY(${180 + (-(window.scrollY - (e - this.step)) / this.step) * 180}deg)
            `;
          } else if (window.scrollY > e) {
            card.style.transform = `
              perspective(100vw)
              translateX(0vw) 
              rotateY(0deg)
            `;
          }
        });
      }
    }

    const cardFlipOnScroll = new CardFlipOnScroll(mainContentRef.current!, stickyRef.current!);
    cardFlipOnScroll.init();

    const handleScroll = () => {
      cardFlipOnScroll.animate();
    };

    const handleResize = () => {
      cardFlipOnScroll.init();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlebuttonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const { x, y, width, height } = btn.getBoundingClientRect();
    const radius = Math.sqrt(width * width + height * height);
    btn.style.setProperty("--diameter", `${radius * 2}px`);

    const { clientX, clientY } = e;
    const left = `${((clientX - x - radius) / width) * 100}%`;
    const top = `${((clientY - y - radius) / height) * 100}%`;

    btn.style.setProperty("--left", left);
    btn.style.setProperty("--top", top);
    btn.style.setProperty("--a", "");

    setTimeout(() => {
      btn.style.setProperty("--a", "ripple-effect 500ms linear");
    }, 5);
  };

  const handleLoginButtonClick = () => {
    if (loginContentRef.current) {
      loginContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="w-full h-[500vh]" ref={mainContentRef}>
        <div
          className="sticky top-0 z-10 flex flex-col justify-center items-center h-screen overflow-hidden"
          ref={stickyRef}
        >
          <Image
            className="absolute top-4 pc:top-16 left-16 w-[15rem] h-[10rem] pc:w-[20rem] pc:h-[10rem]"
            src={logo_lg}
            width={200}
            height={100}
            alt="logo"
            priority
          />
          <div className="flex flex-col justify-center items-center gap-8 py-[5rem] pc:py-[10rem] text-center">
            <h1 className="animate-fade py-4 px-16 pc:py-8 pc:px-20 border border-blue-300 rounded-full bg-blue-100  text-blue-300 text-xl font-semibold pc:text-3xl">
              원하는 운동 유형을 확인하고
              <br />
              레슨을 받아보세요!
            </h1>
            <div className="absolute bottom-0 ">
              <button
                onClick={(e) => {
                  handlebuttonClick(e);
                  handleLoginButtonClick();
                }}
                className="overflow-hidden hover:bg-red-200 hover:text-red-100 relative login m-8 py-4 px-8 border border-red-200 rounded-[1.6rem] bg-red-100 text-red-200 text-xl font-semibold"
              >
                이미 회원이신가요?
              </button>
              <h1 className="animate-bounce text-red-200 text-2lg pc:text-3xl">▼</h1>
            </div>
          </div>
          <div className="card-frame">
            <div className="card shadow-card">
              <div className="front p-4 pc:gap-8 tablet:gap-20 mobile:gap-8 pc:p-12">
                <div className="flex flex-col gap-3">
                  <h1 className={card_title}>재활운동</h1>
                  <p className={card_description}>스트레칭, 재활치료</p>
                </div>
                <Image
                  className={card_img}
                  src={ic_rehab}
                  width={250}
                  height={250}
                  alt="재활운동 이미지"
                />
              </div>
              <div className="back"></div>
            </div>
            <div className="card shadow-card">
              <div className="front p-4 pc:gap-8 tablet:gap-20 mobile:gap-8 pc:p-12">
                <div className="flex flex-col gap-3">
                  <h1 className={card_title}>스포츠</h1>
                  <p className={card_description}>
                    축구, 테니스, 스키,
                    <br className="block pc:hidden" /> 복싱, 주짓수 등
                  </p>
                </div>
                <Image
                  className={card_img}
                  src={ic_sports}
                  width={250}
                  height={250}
                  alt="스포츠 이미지"
                />
              </div>
              <div className="back"></div>
            </div>
            <div className="card shadow-card">
              <div className="front p-4 pc:gap-8 tablet:gap-20 mobile:gap-8 pc:p-12">
                <div className="flex flex-col gap-3">
                  <h1 className={card_title}>피트니스</h1>
                  <p className={card_description}>
                    PT, 요가, 필라테스,
                    <br className="block pc:hidden" /> 식단 관리
                  </p>
                </div>
                <Image
                  className={card_img}
                  src={ic_fitness}
                  width={250}
                  height={250}
                  alt="피트니스 이미지"
                />
              </div>
              <div className="back"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={loginContentRef}
        className="bg-bg-200 relative flex flex-col justify-center items-center gap-20 w-full h-screen text-center text-5xl"
      >
        <h1 className="animate-bounce">
          맞춤형 트레이닝 서비스,
          <br />
          지금 바로 시작해보세요!
        </h1>
        <div className="flex flex-col items-center gap-8 w-[30rem] pc:flex-row">
          <Link className="flex-1" href="/login">
            <button
              onClick={handlebuttonClick}
              className="hover:bg-blue-600 login relative flex-1 w-full p-4 rounded-[1.6rem] text-2lg text-white font-semibold shadow-card bg-blue-300 overflow-hidden"
            >
              로그인
            </button>
          </Link>
          <Link className="flex-1" href="/user/signup">
            <button
              onClick={handlebuttonClick}
              className="hover:bg-blue-200 hover:text-white signup relative w-full p-4 border rounded-[1.6rem] border-blue-300 text-blue-300 text-2lg font-semibold shadow-card bg-blue-100 overflow-hidden"
            >
              회원가입
            </button>
          </Link>
        </div>
        <div className="bg-white w-full px-12">
          <Image src={img_landing_02} width={300} height={200} alt="랜딩 이미지" />
        </div>
        <div className="flex flex-col items-center gap-8 pc:flex-row">
          <p className="text-2lg font-semibold">비회원으로 둘러보고 싶다면?</p>
          <Link
            href="/user/find-trainer"
            className=" hover:bg-red-200 hover:text-red-100 py-4 px-8 border border-red-200 rounded-[1.6rem] text-red-200 text-2lg font-semibold bg-red-100"
          >
            강사님 찾기
          </Link>
        </div>
      </div>
    </>
  );
}
