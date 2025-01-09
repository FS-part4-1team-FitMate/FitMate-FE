import Image from "next/image";
import { RequestType, requestType_trans } from "@/types/types";

interface Props {
  requestType: RequestType;
  size: "lg" | "xl";
}

function ChipRequest({ requestType, size }: Props) {
  const bgClass =
    requestType === RequestType.SPECIFIC
      ? "text-red-500 bg-red-100"
      : "text-slate-900 bg-slate-100";

  return (
    <div
      className={`inline-flex justify-center items-center text-${size} rounded-lg ${bgClass} gap-[2px] py-[4px] px-[3px]`}
    >
      {requestType_trans[requestType].img && (
        <Image src={requestType_trans[requestType].img} width={24} height={24} alt="견적 종류" />
      )}
      {requestType_trans[requestType].ko}
    </div>
  );
}

export default ChipRequest;
