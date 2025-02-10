import Image from "next/image";
import { RequestType, requestType_trans } from "@/types/types";

export default function ChipRequest({ requestType }: { requestType: RequestType }) {
  const bgClass =
    requestType === RequestType.SPECIFIC ? "text-red-500 bg-red-100" : "text-blue-400 bg-slate-100";

  return (
    <div
      className={`inline-flex items-center gap-[2px] w-fit py-[2px] pl-[6px] pr-[8px] rounded-lg text-sm font-regular shadow-chip ${bgClass} pc:gap-[4px] pc:text-lg`}
    >
      {requestType_trans[requestType].img && (
        <Image src={requestType_trans[requestType].img} width={20} height={20} alt="견적 종류" />
      )}
      {requestType_trans[requestType].ko}
    </div>
  );
}
