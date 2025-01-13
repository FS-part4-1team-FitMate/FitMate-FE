import { ic_clip_md, share_ic_facebook_md, share_ic_kakao_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";

const link_wrap = clsx(
  "flex justify-center items-center w-16 h-16 p-[0.8rem] border border-line-200 rounded-[0.8rem]",
  "pc:w-[6.4rem] pc:h-[6.4rem] pc:p-4 pc:rounded-[1.6rem]",
);

export default function ShareSNS({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-[0.8rem] pc:gap-[2.2rem]">
      <p className="text-md font-semibold pc:text-xl">{label}</p>
      <div className="flex items-center gap-[1.6rem]">
        <div className={link_wrap}>
          <Image
            className="w-[2.4rem] h-[2.4rem] pc:w-[3.6rem] pc:h-[3.6rem]"
            src={ic_clip_md}
            width={36}
            height={36}
            alt="링크 공유"
          />
        </div>
        <Image
          className="w-16 h-16 pc:w-[6.4rem] pc:h-[6.4rem]"
          src={share_ic_kakao_md}
          width={64}
          height={64}
          alt="카카오톡 공유"
        />
        <Image
          className="w-16 h-16 pc:w-[6.4rem] pc:h-[6.4rem]"
          src={share_ic_facebook_md}
          width={64}
          height={64}
          alt="페이스북 공유"
        />
      </div>
    </div>
  );
}
