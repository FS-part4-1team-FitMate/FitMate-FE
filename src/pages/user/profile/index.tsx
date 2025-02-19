import { useUser } from "@/contexts/UserProvider";
import { ic_edit_sm } from "@/imageExports";
import { ic_gender_female, ic_gender_male, ic_profile_default_md } from "@/imageExports";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetUser } from "@/lib/api/queries/user";
import { profile_menu } from "@/types/constants";
import { Gender } from "@/types/types";
import ChipDefault from "@/components/Chip/ChipDefault";
import ChipRegion from "@/components/Chip/ChipRegion";
import Button from "@/components/Common/Button";
import Loading from "@/components/Common/Loading";

function Profile() {
  const router = useRouter();
  const user = useUser();
  const { data: profileData, isLoading, isError } = useGetUser(user?.id!);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="text-2lg text-center">에러 발생.</div>;
  }

  return (
    <main className="flex justify-center items-start h-screen py-14 px-8 bg-bg-200">
      <Head>
        <title>나의 프로필</title>
      </Head>

      <div className="flex flex-col gap-12 p-10 w-full border border-gray-100 rounded-[2rem] bg-white shadow-card pc:p-16 tablet:p-16">
        <div className="flex flex-col justify-normal items-start gap-[16px] w-full mx-auto">
          <h1 className="text-2xl font-bold">나의 프로필</h1>
          <div className="flex flex-col items-center gap-12 w-full py-12 border-b border-t pc:flex-row tablet:flex-row">
            <Image
              src={(profileData.profileImagePresignedUrl as string) || ic_profile_default_md}
              alt="Profile Preview"
              width={150}
              height={150}
              priority
              className="border-2 border-blue-300 rounded-full object-cover"
            />
            <div className="flex flex-col gap-4 w-full border-t pc:border-t-0 tablet:border-t-0">
              <p className="w-fit mt-12 px-4 border border-blue-300 rounded-full text-blue-300 text-lg font-bold bg-blue-100 pc:mt-0 tablet:mt-0">
                기본 정보
              </p>
              <div className="flex items-center gap-4 px-2">
                <div className="text-lg font-semibold">이름</div>
                <div className="flex items-center gap-2 text-lg">
                  <p>{profileData.profile.name}</p>
                  <Image
                    src={
                      profileData.profile.gender === Gender.MALE ? ic_gender_male : ic_gender_female
                    }
                    width={20}
                    height={20}
                    alt="gender"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 px-2">
                <div className="text-lg font-semibold">전화번호</div>
                <div className="text-lg">{profileData.profile.phone}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-normal items-start gap-12 w-full mx-auto">
          <div className={`${profile_menu} pb-12 border-b`}>
            <div className="text-lg font-semibold">받고 싶은 레슨 유형</div>
            <div className="flex gap-4 text-lg">
              {profileData.profile.lessonType.map((lessonType, idx) => (
                <ChipDefault key={idx} lessonType={lessonType} />
              ))}
            </div>
          </div>
          <div className={profile_menu}>
            <div className="text-lg font-semibold">내가 사는 지역</div>
            <div className="text-lg">
              {profileData.profile.region.map((region, idx) => (
                <ChipRegion key={idx} region={region} />
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="hover:bg-blue-200 gap-4 max-w-[72rem] w-full h-[5.4rem] mx-auto bg-blue-500 text-white"
            onClick={() => {
              router.push(`/user/profile/edit`);
            }}
          >
            내 프로필 수정 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
