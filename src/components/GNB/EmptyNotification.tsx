import { ic_noti_empty } from "@/imageExports";
import Image from "next/image";

interface Props {
  newNoti?: boolean;
  message: "견적" | "메시지";
}

export default function EmptyNotification({ newNoti = true, message }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 py-[8rem]">
      <Image src={ic_noti_empty} width={100} height={100} alt="noti" />
      <h1 className="text-xl font-semibold">
        {newNoti ? "새로운 " : ""}
        {message} 알림이 없습니다.
      </h1>
    </div>
  );
}
