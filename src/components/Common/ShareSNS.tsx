import { ic_clip_md, share_ic_facebook_md, share_ic_kakao_md } from "@/imageExports";
import Image from "next/image";

export default function ShareSNS({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-[2.2rem]">
      <p className="text-xl font-semibold">{label}</p>
      <div className="flex items-center gap-[1.6rem]">
        <div className="flex justify-center items-center w-[6.4rem] h-[6.4rem] p-4 rounded-[1.6rem] border border-line-200">
          <Image src={ic_clip_md} width={36} height={36} alt="링크 공유" />
        </div>
        <Image src={share_ic_kakao_md} width={64} height={64} alt="카카오톡 공유" />
        <Image src={share_ic_facebook_md} width={64} height={64} alt="페이스북 공유" />
      </div>
    </div>
  );
}
