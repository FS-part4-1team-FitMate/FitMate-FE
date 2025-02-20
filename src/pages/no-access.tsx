import { ic_no_access } from "@/imageExports";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NoAccess() {
  const router = useRouter();

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

    router.back();
  };
  return (
    <div className="bg-bg-200 flex flex-col justify-center items-center w-full h-screen">
      <Head>
        <title>접근 제한 | 핏메이트</title>
      </Head>
      <Image src={ic_no_access} width={200} height={300} alt="no access" />
      <div className="flex items-center bg-gray-500 w-full h-60">
        <div
          className="w-full h-5 bg-white"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 60px, gray 60px, gray 80px)",
            backgroundSize: "100px 100%",
          }}
        ></div>
      </div>
      <div className="flex flex-col items-center gap-12 py-20">
        <h1 className="bg-white animate-bounce py-4 px-8 rounded-[3rem] text-2lg font-bold shadow-card pc:text-2xl tablet:text-xl">
          헉! 접근 불가능한 페이지에요! 🚫
        </h1>
        <button
          onClick={handlebuttonClick}
          className="hover:bg-red-100 hover:text-red-200 red-button relative py-4 px-8 border border-red-200 rounded-[1.6rem] text-red-100 text-lg font-semibold bg-red-200 overflow-hidden shadow-card"
        >
          이전 페이지로 가기
        </button>
      </div>
    </div>
  );
}
