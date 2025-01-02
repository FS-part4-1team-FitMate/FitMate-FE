import { useUser } from "@/contexts/UserProvider";
import Image from "next/image";
import Link from "next/link";

function GNB() {
  const user = useUser();
  let profileImageURL = user?.profile?.profileImage ? user?.profile?.profileImage : "/assets/ic/ic_profile-default-sm.svg"

  return (
    <header className="flex justify-between items-center p-[8px] border-b-2 border-solid border-gray-400">
      <div className="flex justify-start items-center gap-[16px]">
        <Link className="shrink-0" href="/"><Image src="/assets/img/logo_xl.svg" alt="Logo" width={96} height={32} priority /></Link>
        <ul className="flex justify-start items-center gap-[16px] text-lg">
          {user && user?.role === Role.USER
          ? <>
            <li>레슨 요청</li>
            <li>강사님 찾기</li>
            <li>내 레슨 관리</li>
          </>
          : user && user?.role === Role.TRAINER
          ? <li>강의 찾기</li>
          : ""}
        </ul>
      </div>
      <div>
        {user && user?.name
        ? <div className="flex justify-end items-center gap-[16px]">
          <Image src="/assets/ic/ic_alarm_md.svg" alt="alarm" width={24} height={24} />
          <div className="flex justify-end items-center gap-[8px]">
            <Image src={profileImageURL} alt="google" width={24} height={24} />
            <span className="text-2lg font-medium">{user.name}</span>
          </div>
        </div>
        : <Link href="/login"><button className="px-[16px] py-[4px] text-lg rounded-xl bg-blue-500 text-white">로그인</button></Link>}
      </div>
    </header>
  );
}

export default GNB;
