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
    <div className="absolute top-[30px] right-0 w-[20rem] bg-white border border-gray-300 rounded-xl z-10 shadow-card">
      <div className="flex items-center gap-4 w-full py-[10px] px-8">
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
        <h1 className="text-2lg font-semibold">{user?.nickname}</h1>
      </div>
      <div className="hover:bg-bg-200 w-full h-auto text-lg flex items-center py-[10px] px-8 cursor-pointer">
        <Link
          href={user?.role === Role.TRAINER ? `/trainer/${user?.id}/profile` : "/user/profile"}
          className={
            router.pathname.endsWith("profile")
              ? `${active_class} flex justify-center items-center gap-[10px]`
              : "flex justify-center items-center gap-[10px]"
          }
        >
          <span>마이페이지</span>
        </Link>
      </div>
      <div
        className="hover:bg-bg-200 w-full h-auto text-lg flex items-center py-[10px] px-8 cursor-pointer"
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
      {user.role === Role.USER && (
        <div
          className="hover:bg-bg-200 w-full h-auto text-lg flex items-center py-[10px] px-8 cursor-pointer"
          onClick={() => {
            router.push("/user/liked-trainer");
          }}
        >
          <div className={router.pathname.endsWith("liked-trainer") ? active_class : ""}>
            찜한 강사님
          </div>
        </div>
      )}
      {user.role === Role.USER && (
        <div
          className="hover:bg-bg-200 w-full h-auto text-lg flex items-center py-[10px] px-8 cursor-pointer"
          onClick={() => {
            router.push("/user/lesson-review/awaiting-review");
          }}
        >
          <div className={router.pathname.endsWith("awaiting-review") ? active_class : ""}>
            레슨 리뷰
          </div>
        </div>
      )}
      <div
        className="hover:bg-bg-200 hover:rounded-b-xl w-full h-auto border-t text-gray-500 text-lg font-semibold flex justify-center items-center py-[10px] px-8 cursor-pointer"
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
