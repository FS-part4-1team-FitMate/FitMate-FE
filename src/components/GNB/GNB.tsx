import { useSetUser, useUser } from "@/contexts/UserProvider";
import { Device, useViewport } from "@/contexts/ViewportProvider";
import { ic_menu, ic_noti, ic_profile_default_sm, logo_xl } from "@/imageExports";
import "dotenv/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/authService";
import { active_class } from "@/types/constants";
import { Profile, Role, User } from "@/types/types";

function Logo() {
  return (
    <Link className="shrink-0" href="/">
      <Image className="h-auto" src={logo_xl} alt="Logo" width={96} height={32} />
    </Link>
  );
}

interface MenusProps {
  addClass?: boolean;
  user: User | null;
  router: ReturnType<typeof useRouter>;
}

function Menus({ addClass, user, router }: MenusProps) {
  if (user && user?.role === Role.USER) {
    return (
      <>
        <li
          className={
            addClass ? "w-[140px] h-auto text-lg flex justify-center items-center py-[10px]" : ""
          }
        >
          <Link
            href="/user/create-request"
            className={router.pathname === "/user/create-request" ? active_class : ""}
          >
            레슨 요청
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/user/find-trainer"
            className={router.pathname === "/user/find-trainer" ? active_class : ""}
          >
            강사님 찾기
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/user/my-lesson/active-lesson"
            className={router.pathname.startsWith("/user/my-lesson") ? active_class : ""}
          >
            내 레슨 관리
          </Link>
        </li>
      </>
    );
  } else if (user && user?.role === Role.TRAINER) {
    return (
      <>
        <li
          className={
            addClass ? "w-[140px] h-auto text-lg flex justify-center items-center py-[10px]" : ""
          }
        >
          <Link
            href="/trainer/received-request"
            className={router.pathname === "/trainer/received-request" ? active_class : ""}
          >
            받은 요청
          </Link>
        </li>
        <li
          className={
            addClass
              ? "w-[140px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px]"
              : ""
          }
        >
          <Link
            href="/trainer/managing-request/sent-request"
            className={router.pathname.startsWith("/trainer/managing-request") ? active_class : ""}
          >
            내 견적 관리
          </Link>
        </li>
      </>
    );
  } else {
    return (
      <li
        className={
          addClass ? "w-[140px] h-auto text-lg flex justify-center items-center py-[10px]" : ""
        }
      >
        <Link
          href="/user/find-trainer"
          className={router.pathname === "/user/find-trainer" ? active_class : ""}
        >
          강사님 찾기
        </Link>
      </li>
    );
  }
}

interface MyProfileMenusProps {
  user: User;
  profileData?: {
    profile: Profile;
    profileImagePresignedUrl?: string;
    certificationPresignedUrl?: string;
  };
  setUser: Dispatch<SetStateAction<User | null>>;
  router: ReturnType<typeof useRouter>;
}

function MyProfileMenus({ user, profileData, setUser, router }: MyProfileMenusProps) {
  return (
    <div className="absolute top-[30px] right-0 w-[260px] bg-white border border-gray-300 rounded-xl px-[10px] z-10">
      <div className="w-[240px] h-auto text-lg flex justify-center items-center py-[10px]">
        <Link
          href={user?.role === Role.TRAINER ? `/trainer/${user?.id}/profile` : "/user/profile"}
          className={
            router.pathname.endsWith("profile")
              ? `${active_class} flex justify-center items-center gap-[10px]`
              : "flex justify-center items-center gap-[10px]"
          }
        >
          <Image
            className="object-cover rounded-full w-[24px] h-[24px]"
            src={
              profileData?.profileImagePresignedUrl
                ? profileData.profileImagePresignedUrl
                : ic_profile_default_sm
            }
            alt="Profile Image"
            width={24}
            height={24}
          />
          <span>{user?.nickname}&nbsp;프로필</span>
        </Link>
      </div>
      <div
        className="w-[240px] h-auto text-lg border-t-[1px] border-solid border-slate-400 flex justify-center items-center py-[10px] cursor-pointer"
        onClick={() => {
          if (user?.hasProfile) {
            if (user.role === Role.USER) {
              router.push("/user/profile/edit");
            } else if (user.role === Role.TRAINER) {
              router.push(`/trainer/${user.id}/profile/edit`);
            }
          } else {
            if (user?.role === Role.USER) {
              router.push("/user/profile/regist");
            } else if (user?.role === Role.TRAINER) {
              router.push(`/trainer/${user?.id}/profile/regist`);
            }
          }
        }}
      >
        <div
          className={
            router.pathname.endsWith("profile/edit") || router.pathname.endsWith("profile/regist")
              ? active_class
              : ""
          }
        >
          프로필&nbsp;{user?.hasProfile ? "수정" : "등록"}
        </div>
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
  );
}

function LogInButton() {
  return (
    <Link href="/login">
      <button className="px-[16px] py-[4px] text-lg rounded-xl bg-blue-500 text-white">
        로그인
      </button>
    </Link>
  );
}

function Notifications() {
  return (
    <div
      className={`absolute top-[30px] right-[-30px] w-[280px] bg-white border border-gray-300 rounded-xl p-[10px] text-lg z-10`}
    >
      알림
    </div>
  );
}

function GNB() {
  const refNoti = useRef<HTMLDivElement>(null);
  const refMyProfile = useRef<HTMLDivElement>(null);
  const refMenu = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const viewport = useViewport();
  const user = useUser();
  const setUser = useSetUser();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [notiIsOpen, setNotiIsOpen] = useState(false);
  const [myProfileIsOpen, setMyProfileIsOpen] = useState(false);
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfile(user?.id!),
    cacheTime: 60 * 60 * 1000,
    staleTime: 60 * 60 * 1000,
    enabled: !!user?.id,
  });

  const handleOutsideClick = (e: MouseEvent) => {
    if (refMyProfile.current && !refMyProfile.current.contains(e.target as Node)) {
      setMyProfileIsOpen(false);
    }
    if (refNoti.current && !refNoti.current.contains(e.target as Node)) {
      setNotiIsOpen(false);
    }
    if (refMenu.current && !refMenu.current.contains(e.target as Node)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html?.addEventListener("click", handleOutsideClick);
    return () => html?.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (user && profileData) {
      setUser({
        ...user,
        ...profileData,
        hasProfile: !!profileData.profile.id,
      });
    }
  }, [profileData]);

  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     `${process.env.NEXT_PUBLIC_API_URL}/sse?userId=${user?.id!}`,
  //   ); // 서버의 SSE 엔드포인트
  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     // 받은 데이터 처리 (예: 알림 표시, 상태 업데이트)
  //     console.log(data);
  //   };
  //   eventSource.onerror = (error) => {
  //     console.error("Error:", error);
  //   };
  //   return () => {
  //     eventSource.close();
  //   };
  // }, [user]);

  if (viewport.device === Device.PC || viewport.device === Device.TABLET) {
    return (
      <header className="flex justify-between items-center p-[8px] border-b-[1px] border-solid border-line-100 pc:px-[200px]">
        <div className="flex justify-start items-center gap-[16px]">
          <Logo />
          <ul className="flex justify-start items-center gap-[16px] text-lg">
            <Menus addClass={false} user={user} router={router} />
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
                {notiIsOpen && <Notifications />}
              </div>
              <div ref={refMyProfile} className="relative">
                <div
                  className="cursor-pointer flex justify-end items-center gap-[8px]"
                  onClick={() => setMyProfileIsOpen((prev) => !prev)}
                >
                  <Image
                    className="object-cover rounded-full w-[24px] h-[24px]"
                    src={
                      profileData?.profileImagePresignedUrl
                        ? profileData.profileImagePresignedUrl
                        : ic_profile_default_sm
                    }
                    alt="Profile Image"
                    width={24}
                    height={24}
                  />
                  <span className="text-md font-medium">{user?.nickname}</span>
                </div>
                {myProfileIsOpen && (
                  <MyProfileMenus
                    user={user}
                    profileData={profileData}
                    setUser={setUser}
                    router={router}
                  />
                )}
              </div>
            </div>
          ) : (
            <LogInButton />
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center p-[8px] border-b-[1px] border-solid border-line-100">
      <div className="flex justify-start items-center">
        <Logo />
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
                {notiIsOpen && <Notifications />}
              </div>
              <div ref={refMyProfile} className="relative cursor-pointer">
                <Image
                  className="object-cover rounded-full w-[24px] h-[24px]"
                  src={
                    profileData?.profileImagePresignedUrl
                      ? profileData.profileImagePresignedUrl
                      : ic_profile_default_sm
                  }
                  alt="Profile Image"
                  width={24}
                  height={24}
                  onClick={() => setMyProfileIsOpen((prev) => !prev)}
                />
                {myProfileIsOpen && (
                  <MyProfileMenus
                    user={user}
                    profileData={profileData}
                    setUser={setUser}
                    router={router}
                  />
                )}
              </div>
            </>
          ) : (
            <LogInButton />
          )}
          <div ref={refMenu} className="relative">
            <Image
              src={ic_menu}
              alt="menu"
              width={24}
              height={24}
              onClick={() => setMenuIsOpen((prev) => !prev)}
            />
            {menuIsOpen && (
              <ul className="absolute top-[30px] right-0 w-[160px] bg-white border border-gray-300 rounded-xl px-[10px] py-[2px] z-10">
                <Menus addClass={true} user={user} router={router} />
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default GNB;
