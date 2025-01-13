import { useSetUser, useUser } from "@/contexts/UserProvider";
import { Device, useViewport } from "@/contexts/ViewportProvider";
import { ic_menu, ic_noti, ic_profile_default_sm, logo_xl } from "@/imageExports";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { active_class } from "@/types/constants";
import { Role } from "@/types/types";

function GNB() {
  const refNoti = useRef<HTMLDivElement>(null);
  const refMyProfile = useRef<HTMLDivElement>(null);
  const refMenu = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const viewport = useViewport();
  const user = useUser();
  const setUser = useSetUser();
  let profileImageURL = user?.profile?.profileImage
    ? user?.profile?.profileImage
    : ic_profile_default_sm;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [notiIsOpen, setNotiIsOpen] = useState(false);
  const [myProfileIsOpen, setMyProfileIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html?.addEventListener("click", (e: MouseEvent) => {
      if (refMyProfile.current && !refMyProfile.current.contains(e.target as Node)) {
        setMyProfileIsOpen(false);
      }
      if (refNoti.current && !refNoti.current.contains(e.target as Node)) {
        setNotiIsOpen(false);
      }
      if (refMenu.current && !refMenu.current.contains(e.target as Node)) {
        setMenuIsOpen(false);
      }
    });
  }, []);

  if (viewport.device === Device.PC || viewport.device === Device.TABLET) {
    return (
      <header className="flex justify-between items-center p-[8px] border-b-[1px] border-solid border-line-100 pc:px-[200px]">
        <div className="flex justify-start items-center gap-[16px]">
          <Link className="shrink-0" href="/">
            <Image src={logo_xl} alt="Logo" width={96} height={32} priority />
          </Link>
          <ul className="flex justify-start items-center gap-[16px] text-lg">
            {user && user?.role === Role.USER ? (
              <>
                <li>
                  <Link
                    href="/user/create-request"
                    className={router.pathname === "/user/create-request" ? active_class : ""}
                  >
                    레슨 요청
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/find-trainer"
                    className={router.pathname === "/user/find-trainer" ? active_class : ""}
                  >
                    강사님 찾기
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/my-lesson/active-lesson"
                    className={router.pathname.startsWith("/user/my-lesson") ? active_class : ""}
                  >
                    내 레슨 관리
                  </Link>
                </li>
              </>
            ) : user && user?.role === Role.TRAINER ? (
              <>
                <li>
                  <Link
                    href="/trainer/received-request"
                    className={router.pathname === "/trainer/received-request" ? active_class : ""}
                  >
                    받은 요청
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trainer/managing-request/sent-request"
                    className={
                      router.pathname.startsWith("/trainer/managing-request") ? active_class : ""
                    }
                  >
                    내 견적 관리
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/user/find-trainer"
                  className={router.pathname === "/user/find-trainer" ? active_class : ""}
                >
                  강사님 찾기
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          {user && user?.id ? (
            <div className="flex justify-end items-center gap-[16px]">
              <div ref={refNoti} className="relative">
                <Image
                  className="cursor-pointer"
                  src={ic_noti}
                  alt="noti"
                  width={24}
                  height={24}
                  onClick={() => setNotiIsOpen((prev) => !prev)}
                />
                {notiIsOpen && (
                  <div className="absolute top-[30px] right-0 w-[280px] bg-white border border-gray-300 rounded-xl px-[10px] text-lg">
                    Notification
                  </div>
                )}
              </div>
              <div ref={refMyProfile} className="relative">
                <div
                  className="cursor-pointer flex justify-end items-center gap-[8px]"
                  onClick={() => setMyProfileIsOpen((prev) => !prev)}
                >
                  <Image src={profileImageURL} alt="google" width={24} height={24} />
                  <span className="text-md font-medium">{user?.nickname}</span>
                </div>
                {myProfileIsOpen && (
                  <div className="absolute top-[30px] right-0 w-[260px] bg-white border border-gray-300 rounded-xl px-[10px]">
                    <div className="w-[240px] h-auto text-lg flex justify-center items-center py-[10px]">
                      <Link
                        href={
                          user.role === Role.TRAINER
                            ? `/trainer/${user.id}/profile/edit`
                            : "/user/profile/edit"
                        }
                        className={
                          router.pathname.includes("profile")
                            ? `${active_class} flex justify-center items-center gap-[10px]`
                            : "flex justify-center items-center gap-[10px]"
                        }
                      >
                        <Image src={profileImageURL} alt="google" width={24} height={24} />
                        <span>{user?.nickname}&nbsp;프로필</span>
                      </Link>
                    </div>
                    <div
                      className="w-[240px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px] cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("userData");
                        setUser(null);
                        router.push("/login");
                      }}
                    >
                      로그아웃
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-[16px] py-[4px] text-lg rounded-xl bg-blue-500 text-white">
                로그인
              </button>
            </Link>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center p-[8px] border-b-[1px] border-solid border-line-100">
      <div className="flex justify-start items-center">
        <Link className="shrink-0" href="/">
          <Image src={logo_xl} alt="Logo" width={96} height={32} priority />
        </Link>
      </div>
      <div>
        <div className="flex justify-end items-center gap-[16px]">
          {user && user?.id ? (
            <>
              <div ref={refNoti} className="relative cursor-pointer">
                <Image
                  src={ic_noti}
                  alt="noti"
                  width={24}
                  height={24}
                  onClick={() => setNotiIsOpen((prev) => !prev)}
                />
                {notiIsOpen && (
                  <div className="absolute top-[30px] right-[-30px] w-[280px] bg-white border border-gray-300 rounded-xl px-[10px] text-lg">
                    Notification
                  </div>
                )}
              </div>
              <div ref={refMyProfile} className="relative cursor-pointer">
                <Image
                  src={profileImageURL}
                  alt="google"
                  width={24}
                  height={24}
                  onClick={() => setMyProfileIsOpen((prev) => !prev)}
                />
                {myProfileIsOpen && (
                  <div className="absolute top-[30px] right-0 w-[260px] bg-white border border-gray-300 rounded-xl px-[10px]">
                    <div className="w-[240px] h-auto text-lg flex justify-center items-center py-[10px]">
                      <Link
                        href={
                          user.role === Role.TRAINER
                            ? `/trainer/${user.id}/profile/edit`
                            : "/user/profile/edit"
                        }
                        className={
                          router.pathname.includes("profile")
                            ? `${active_class} flex justify-center items-center gap-[10px]`
                            : "flex justify-center items-center gap-[10px]"
                        }
                      >
                        <Image src={profileImageURL} alt="google" width={24} height={24} />
                        <span>{user?.nickname}&nbsp;프로필</span>
                      </Link>
                    </div>
                    <div
                      className="w-[240px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px] cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("userData");
                        setUser(null);
                        router.push("/login");
                      }}
                    >
                      로그아웃
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/login">
              <button className="px-[16px] py-[4px] text-lg rounded-xl bg-blue-500 text-white">
                로그인
              </button>
            </Link>
          )}
          <div ref={refMenu} className="relative">
            <Image
              src={ic_menu}
              alt="menu"
              width={24}
              height={24}
              onClick={() => setMenuIsOpen((prev) => !prev)}
            />
            {menuIsOpen &&
              (user && user?.role === Role.USER ? (
                <div className="absolute top-[30px] right-0 w-[160px] bg-white border border-gray-300 rounded-xl px-[10px] py-[2px]">
                  <div className="w-[140px] h-auto text-lg flex justify-center items-center py-[10px]">
                    <Link
                      href="/user/create-request"
                      className={router.pathname === "/user/create-request" ? active_class : ""}
                    >
                      레슨 요청
                    </Link>
                  </div>
                  <div className="w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]">
                    <Link
                      href="/user/find-trainer"
                      className={router.pathname === "/user/find-trainer" ? active_class : ""}
                    >
                      강사님 찾기
                    </Link>
                  </div>
                  <div className="w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]">
                    <Link
                      href="/user/my-lesson/active-lesson"
                      className={router.pathname.startsWith("/user/my-lesson") ? active_class : ""}
                    >
                      내 레슨 관리
                    </Link>
                  </div>
                </div>
              ) : user && user?.role === Role.TRAINER ? (
                <div className="absolute top-[30px] right-0 w-[160px] bg-white border border-gray-300 rounded-xl px-[10px] py-[2px]">
                  <div className="w-[140px] h-auto text-lg flex justify-center items-center py-[10px]">
                    <Link
                      href="/trainer/received-request"
                      className={
                        router.pathname === "/trainer/received-request" ? active_class : ""
                      }
                    >
                      받은 요청
                    </Link>
                  </div>
                  <div className="w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]">
                    <Link
                      href="/trainer/managing-request/sent-request"
                      className={
                        router.pathname.startsWith("/trainer/managing-request") ? active_class : ""
                      }
                    >
                      내 견적 관리
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="absolute top-[30px] right-0 w-[160px] bg-white border border-gray-300 rounded-xl px-[10px] py-[2px]">
                  <div className="w-[140px] h-auto text-lg flex justify-center items-center py-[10px]">
                    <Link
                      href="/user/find-trainer"
                      className={router.pathname === "/user/find-trainer" ? active_class : ""}
                    >
                      강사님 찾기
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default GNB;
