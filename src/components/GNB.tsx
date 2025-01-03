import { useUser } from "@/contexts/UserProvider";
import { Device, useViewport } from "@/contexts/ViewportProvider";
import { ic_alarm_md, ic_menu, ic_profile_default_sm, logo_xl } from "@/imageExports";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function GNB() {
  const viewport = useViewport();
  const user = useUser();
  let profileImageURL = user?.profile?.profileImage ? user?.profile?.profileImage : ic_profile_default_sm;
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  if (viewport.device === Device.PC || viewport.device === Device.TABLET) {
    return (
      <header className="flex justify-between items-center p-[8px] border-b-2 border-solid border-gray-400 pc:px-[200px]">
        <div className="flex justify-start items-center gap-[16px]">
          <Link className="shrink-0" href="/"><Image src={logo_xl} alt="Logo" width={96} height={32} priority /></Link>
          <ul className="flex justify-start items-center gap-[16px] text-lg">
            {user && user?.role === Role.USER
            ? <>
              <li>레슨 요청</li>
              <li>강사님 찾기</li>
              <li>내 레슨 관리</li>
            </>
            : user && user?.role === Role.TRAINER
            ? <>
              <li>받은 요청</li>
              <li>내 견적 관리</li>
            </>
            : <li>강사님 찾기</li>}
          </ul>
        </div>
        <div>
          {user && user?.name
          ? <div className="flex justify-end items-center gap-[16px]">
            <Image src={ic_alarm_md} alt="alarm" width={24} height={24} />
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

  return (<header className="flex justify-between items-center p-[8px] border-b-2 border-solid border-gray-400">
    <div className="flex justify-start items-center">
      <Link className="shrink-0" href="/"><Image src={logo_xl} alt="Logo" width={96} height={32} priority /></Link>
    </div>
    <div>
      <div className="flex justify-end items-center gap-[16px]">
        {user && user?.id
        ? <>
          <Image src={ic_alarm_md} alt="alarm" width={24} height={24} />
          <Image src={profileImageURL} alt="google" width={24} height={24} />
        </>
        : <Link href="/login"><button className="px-[16px] py-[4px] text-lg rounded-xl bg-blue-500 text-white">로그인</button></Link>}
        <div className="relative">
          <Image src={ic_menu} alt="menu" width={24} height={24} onClick={() => setMenuIsOpen(prev => !prev)} />
          {menuIsOpen && (user && user?.role === Role.USER
          ? <div className="absolute top-[30px] right-0 w-[160px] bg-white border border-gray-300 rounded-xl p-[10px]">
            <div className="w-[140px] h-auto text-lg flex justify-center items-center">
              레슨 요청
            </div>
            <div className="w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center">
              강사님 찾기
            </div>
            <div className="w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center">
              내 레슨 관리
            </div>
          </div>
          : user && user?.role === Role.TRAINER
          ? <div className="absolute top-[30px] right-0 w-[160px] bg-white border border-gray-300 rounded-xl p-[10px]">
            <div className="w-[140px] h-auto text-lg flex justify-center items-center">
              받은 요청
            </div>
            <div className="w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center">
              내 견적 관리
            </div>
          </div>
          : <div className="absolute top-[30px] right-0 w-[160px] bg-white border border-gray-300 rounded-xl p-[10px]">
            <div className="w-[140px] h-auto text-lg flex justify-center items-center">
              강사님 찾기
            </div>
          </div>)}
        </div>
      </div>
    </div>
  </header>);
}

export default GNB;
