import { ic_clip_md, share_ic_facebook_md, share_ic_kakao_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";

const link_wrap = clsx(
  "flex justify-center items-center border border-line-200",
  "pc:w-[6.4rem] tablet:w-16 mobile:w-16",
  "pc:h-[6.4rem] tablet:h-16 mobile:h-16",
  "pc:p-4 tablet:p-[0.8rem] mobile:p-[0.8rem]",
  "pc:rounded-[1.6rem] tablet:rounded-[0.8rem] mobile:rounded-[0.8rem]",
);
const img_link = clsx(
  "pc:w-[3.6rem] tablet:w-[2.4rem] mobile:w-[2.4rem]",
  "pc:h-[3.6rem] tablet:h-[2.4rem] mobile:h-[2.4rem]",
);
const img_sns = clsx(
  "pc:w-[6.4rem] tablet:w-16 mobile:w-16",
  "pc:h-[6.4rem] tablet:h-16 mobile:h-16",
);

export default function ShareSNS({ label }: { label: string }) {
  return (
    <div className="flex flex-col pc:gap-[2.2rem] tablet:gap-[0.8rem] mobile:gap-[0.8rem]">
      <p className="font-semibold pc:text-xl tablet:text-md mobile:text-md">{label}</p>
      <div className="flex items-center gap-[1.6rem]">
        <div className={link_wrap}>
          <Image className={img_link} src={ic_clip_md} width={36} height={36} alt="링크 공유" />
        </div>
        <Image
          className={img_sns}
          src={share_ic_kakao_md}
          width={64}
          height={64}
          alt="카카오톡 공유"
        />
        <Image
          className={img_sns}
          src={share_ic_facebook_md}
          width={64}
          height={64}
          alt="페이스북 공유"
        />
      </div>
    </div>
  );
}
