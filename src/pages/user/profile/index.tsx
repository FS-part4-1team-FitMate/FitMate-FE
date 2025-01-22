import { useUser } from "@/contexts/UserProvider";
import { ic_edit_sm } from "@/imageExports";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/authService";
import { profile_menu } from "@/types/constants";
import { gender_trans, lessonType_trans, region_trans } from "@/types/types";
import Button from "@/components/Common/Button";
import Loading from "@/components/Common/Loading";

function Profile() {
  const router = useRouter();
  const user = useUser();
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="text-2lg text-center">에러 발생.</div>;
  }

  return (
    <main className="pc:flex justify-center items-start gap-[32px]">
      <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:mr-[16px] p-[4px] my-[24px]">
        <div className={profile_menu}>
          <h1 className="text-xl font-bold">나의 프로필</h1>
        </div>
        <hr className="w-full border-[1px] border-solid border-gray-300" />
        <div className={profile_menu}>
          <div className="w-full text-lg font-semibold">프로필 이미지</div>
          <Image
            src={profileData.profileImagePresignedUrl as string}
            alt="Profile Preview"
            width={150}
            height={150}
            className="rounded-3xl border-2 border-gray-300 object-cover w-[150px] h-[150px]"
          />
        </div>
        <hr className="w-full border-[1px] border-solid border-gray-300" />
        <div className={profile_menu}>
          <div className="text-lg font-semibold">이름</div>
          <div className="text-lg">{profileData.profile.name}</div>
        </div>
        <hr className="w-full border-[1px] border-solid border-gray-300" />
        <div className={profile_menu}>
          <div className="text-lg font-semibold">전화번호</div>
          <div className="text-lg">{profileData.profile.phone}</div>
        </div>
        <hr className="w-full border-[1px] border-solid border-gray-300" />
      </div>
      <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:ml-[16px] p-[4px] my-[24px]">
        <div className={profile_menu}>
          <div className="text-lg font-semibold">성별</div>
          <div className="text-lg">{gender_trans[profileData.profile.gender]}</div>
        </div>
        <hr className="w-full border-[1px] border-solid border-gray-300" />
        <div className={profile_menu}>
          <div className="text-lg font-semibold">받고 싶은 레슨 유형</div>
          <div className="text-lg">
            {profileData.profile.lessonType
              .map((lessonType) => lessonType_trans[lessonType].ko)
              .join(", ")}
          </div>
        </div>
        <hr className="w-full border-[1px] border-solid border-gray-300" />
        <div className={profile_menu}>
          <div className="text-lg font-semibold">내가 사는 지역</div>
          <div className="text-lg">
            {profileData.profile.region.map((region) => region_trans[region]).join(", ")}
          </div>
        </div>
        <hr className="w-full border-[1px] border-solid border-gray-300" />
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white"
          onClick={() => {
            router.push(`/user/profile/edit`);
          }}
        >
          내 프로필 수정 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
        </Button>
      </div>
    </main>
  );
}

export default Profile;
