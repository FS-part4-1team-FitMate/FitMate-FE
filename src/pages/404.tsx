import { img_404 } from "@/imageExports";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NotFound() {
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
    <div className="bg-bg-200 flex justify-center items-center w-full h-screen">
      <Head>
        <title>404 Not Found | 핏메이트</title>
      </Head>
      <div className="bg-red-100  flex flex-col justify-center items-center gap-12 p-12 rounded-[1.6rem] pc:rounded-full tablet:rounded-full pc:gap-16 pc:p-48 tablet:p-40">
        <Image src={img_404} width={400} height={350} alt="404 아이콘" priority />
        <h1 className="bg-white animate-bounce py-4 px-8 rounded-[3rem] text-2lg font-bold shadow-card pc:text-2xl tablet:text-xl">
          요청하신 페이지를 찾을 수 없어요! 🔍
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
