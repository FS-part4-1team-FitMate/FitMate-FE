import { ic_profile_default_sm } from "@/imageExports";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { active_class } from "@/types/constants";
import { ProfileData, Role, User } from "@/types/types";

interface MyProfileMenusProps {
  user: User;
  profileData?: ProfileData;
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

export default MyProfileMenus;
