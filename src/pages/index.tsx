import { ic_fitness, ic_rehab, ic_sports } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
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
  const stickyRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div className="w-full h-[500vh]" ref={mainContentRef}>
        <div
          className="sticky top-0 flex justify-center items-center h-screen overflow-hidden"
          ref={stickyRef}
        >
          <div className="flex flex-col justify-center items-center gap-8 py-[5rem] pc:py-[10rem] text-center pc:text-6xl">
            <h1 className="animate-fade py-4 px-8 pc:py-8 pc:px-16 border border-blue-300 rounded-full bg-blue-100  text-blue-300 text-2lg font-semibold pc:text-3xl">
              원하는 운동 유형을 확인하고
              <br />
              레슨을 받아보세요
            </h1>
            <h1 className="animate-bounce text-blue-300 text-2lg pc:text-3xl">▼</h1>
          </div>
          <div className="card-frame">
            <div className="card shadow-card">
              <div className="front gap-4 p-4 pc:gap-8 pc:p-12">
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
              <div className="front gap-4 p-4 pc:gap-8 pc:p-12">
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
              <div className="front gap-4 p-4 pc:gap-8 pc:p-12">
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
      <div className="bg-bg-200 flex flex-col justify-center items-center w-full h-screen text-center text-5xl">
        <h1 className="animate-bounce">
          맞춤형 트레이닝 서비스,
          <br />
          지금 바로 시작해보세요!
        </h1>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </>
  );
}
