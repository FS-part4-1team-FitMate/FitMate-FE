import { ic_noti_empty } from "@/imageExports";
import Image from "next/image";

export default function EmptyNotification({ message }: { message: "견적" | "메시지" }) {
  return (
    <div className="flex flex-col items-center gap-8 py-[8rem]">
      <Image src={ic_noti_empty} width={100} height={100} alt="noti" />
      <h1 className="text-xl font-semibold">새로운 {message} 알림이 없습니다.</h1>
    </div>
  );
}
