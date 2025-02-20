import { useNotifications } from "@/contexts/NotificationProvider";
import { useSetUser, useUser } from "@/contexts/UserProvider";
import { Device, useViewport } from "@/contexts/ViewportProvider";
import { ic_menu, ic_noti, ic_noti_empty, ic_profile_default_sm } from "@/imageExports";
import "dotenv/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useGetNotiList, useReadNotiMutation } from "@/lib/api/queries/notification";
import { useGetUser } from "@/lib/api/queries/user";
import { LSUserData } from "@/types/types";
import PopUp, { CustomError } from "../Common/PopUp";
import LogInButton from "./LogInButton";
import Logo from "./Logo";
import Menus from "./Menus";
import MyProfileMenus from "./MyProfileMenus";
import Notifications from "./Notifications";

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
  const { data: profileData } = useGetUser(user?.id!);
  const {
    data: notiData,
    fetchNextPage: fetchNextNotiPage,
    hasNextPage: hasNextNotiPage,
  } = useGetNotiList(user?.id!, { page: 1, limit: 5, order: "created_at", sort: "desc" });
  const notiContext = useNotifications();
  const readNotiMutation = useReadNotiMutation(notiContext);
  const [hasNoti, setHasNoti] = useState<boolean>(true);
  const [error, setError] = useState<CustomError>(null);

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
      try {
        const userDataLS: LSUserData = JSON.parse(localStorage.getItem("userData")!);
        userDataLS.user = {
          ...userDataLS.user,
          ...profileData,
          hasProfile: !!profileData?.profile.id,
        };
        setUser(() => userDataLS.user);
        userDataLS.hasProfile = !!profileData?.profile.id;
        localStorage.setItem("userData", JSON.stringify(userDataLS as LSUserData));
        router.replace(router.asPath);
      } catch (err) {
        console.error(err);
        setError({ message: (err as Error).message });
      }
    }
  }, [profileData]);

  useEffect(() => {
    setHasNoti(
      notiData?.pages.flatMap((page) => page.list)?.filter((noti) => !noti.isRead).length! > 0 ||
        notiContext?.notifications?.filter((noti) => !noti.isRead).length > 0,
    );
  }, [notiData, notiContext.notifications]);

  if (viewport.device === Device.PC || viewport.device === Device.TABLET) {
    return (
      <header className="bg-white text-slate-950 flex justify-between items-center p-[8px] border-b-[1px] border-solid border-line-100 pc:px-[200px]">
        <PopUp error={error} setError={setError} onlyCancel={true} />
        <div className="flex justify-start items-center gap-[16px]">
          <Logo />
          <ul className="flex justify-start items-center gap-[16px] text-lg">
            <Menus addClass={false} user={user} router={router} />
          </ul>
        </div>
        <div>
          {user && user?.id ? (
            <div className="flex justify-end items-center gap-[16px]">
              {user?.hasProfile && (
                <div ref={refNoti} className="relative">
                  <Image
                    className="cursor-pointer"
                    src={hasNoti ? ic_noti : ic_noti_empty}
                    alt="noti"
                    width={24}
                    height={24}
                    onClick={() => setNotiIsOpen((prev) => !prev)}
                  />
                  {notiIsOpen && (
                    <Notifications
                      notiData={notiData}
                      notiContext={notiContext}
                      hasNextNotiPage={hasNextNotiPage}
                      fetchNextNotiPage={fetchNextNotiPage}
                      readNotiMutation={readNotiMutation}
                    />
                  )}
                </div>
              )}
              <div ref={refMyProfile} className="relative">
                <div
                  className="cursor-pointer flex justify-end items-center gap-[8px]"
                  onClick={() => setMyProfileIsOpen((prev) => !prev)}
                >
                  <img
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
    <header className="bg-white text-slate-950 flex justify-between items-center p-[8px] border-b-[1px] border-solid border-line-100">
      <PopUp error={error} setError={setError} onlyCancel={true} />
      <div className="flex justify-start items-center">
        <Logo />
      </div>
      <div>
        <div className="flex justify-end items-center gap-[16px]">
          {user && user?.id ? (
            <>
              {user?.hasProfile && (
                <div ref={refNoti} className="relative cursor-pointer">
                  <Image
                    src={hasNoti ? ic_noti : ic_noti_empty}
                    alt="noti"
                    width={24}
                    height={24}
                    onClick={() => setNotiIsOpen((prev) => !prev)}
                  />
                  {notiIsOpen && (
                    <Notifications
                      notiData={notiData}
                      notiContext={notiContext}
                      hasNextNotiPage={hasNextNotiPage}
                      fetchNextNotiPage={fetchNextNotiPage}
                      readNotiMutation={readNotiMutation}
                    />
                  )}
                </div>
              )}
              <div ref={refMyProfile} className="relative cursor-pointer">
                <img
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
