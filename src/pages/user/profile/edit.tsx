import { useSetUser, useUser } from "@/contexts/UserProvider";
import { ic_edit_sm } from "@/imageExports";
import axios from "axios";
import deepEqual from "fast-deep-equal";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "@/lib/api/queries/user";
import { patchProfile } from "@/lib/api/userService";
import { PHONE_REGEX, error_class, note_class, profile_menu } from "@/types/constants";
import { Gender, LSUserData, LessonType, ProfileEdittable, Region } from "@/types/types";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import Loading from "@/components/Common/Loading";
import PopUp from "@/components/Common/PopUp";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

type FormType = Partial<ProfileEdittable>;
// & {
//   currPassword: string;
//   password: string;
//   passwordConfirm: string;
// };

function ProfileEdit() {
  // const [curPwdIsVisible, setCurPwdIsVisible] = useState(false);
  // const [pwdIsVisible, setPwdIsVisible] = useState(false);
  // const [pwdCfmIsVisible, setPwdCfmIsVisible] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLessonVisible, setIsLessonVisible] = useState<boolean>(false);
  const [isRegionVisible, setIsRegionVisible] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<Region[]>([]);
  const user = useUser();
  const setUser = useSetUser();
  const [error, setError] = useState<
    null | Error | { message: string; onOK?: () => void; onCancel?: () => void }
  >(null);
  const {
    register,
    // watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      profileImage: user?.profile?.profileImage,
      profileImageCount: 0,
      contentType: "",
      name: user?.profile?.name,
      phone: user?.profile?.phone,
      gender: user?.profile?.gender,
      lessonType: user?.profile?.lessonType,
      region: user?.profile?.region,
      // currPassword: "",
      // password: "",
      // passwordConfirm: "",
    } as FormType,
  });
  const { data: profileData, isLoading, isError } = useGetUser(user?.id!);

  useEffect(() => {
    try {
      const userDataLS: LSUserData = JSON.parse(localStorage.getItem("userData")!);
      if (user && profileData) {
        userDataLS.user = {
          ...userDataLS.user,
          ...profileData,
          hasProfile: !!profileData?.profile.id,
        };
        userDataLS.hasProfile = !!profileData?.profile.id;
        setUser(() => userDataLS.user);
        reset(profileData.profile);
        setSelectedRegion(profileData.profile.region);
        localStorage.setItem("userData", JSON.stringify(userDataLS as LSUserData));
      }
    } catch (err) {
      console.error(err);
      setError({ message: (err as Error).message });
    }
  }, [profileData]);

  const onSubmit = async (data: FormType) => {
    try {
      const profile: ProfileEdittable = user?.profile!;
      const changedData = Object.keys(data).reduce<Partial<ProfileEdittable>>((acc, key) => {
        const typedKey = key as keyof ProfileEdittable;
        const newValue = data[typedKey];
        if (newValue !== undefined && !deepEqual(newValue, profile?.[typedKey])) {
          return { ...acc, [typedKey]: newValue };
        }
        return acc;
      }, {});
      if (!deepEqual(data.region, selectedRegion)) {
        changedData.region = selectedRegion;
      }
      let profileImageFileToUpload;
      if (changedData && "profileImage" in changedData && changedData?.profileImage?.length) {
        const profileImage = changedData.profileImage;
        console.log(profileImage);
        if (profileImage instanceof FileList && profileImage[0]?.name) {
          profileImageFileToUpload = profileImage[0];
          changedData.profileImageCount = 1;
          changedData.contentType = profileImage[0].type;
          delete changedData.profileImage;
        }
      }

      delete changedData.updatedAt;
      const userProfile = await patchProfile(user?.id!, changedData);
      if (userProfile && "profileImagePresignedUrl" in userProfile) {
        await axios.put(userProfile.profileImagePresignedUrl as string, profileImageFileToUpload);
      }
      const userDataLS: LSUserData = JSON.parse(localStorage.getItem("userData")!);
      userDataLS.user = {
        ...userDataLS.user,
        ...userProfile,
        hasProfile: !!userProfile?.user.profile?.id,
      };
      userDataLS.hasProfile = !!userProfile?.user.profile?.id;
      setUser(() => userDataLS.user);
      localStorage.setItem("userData", JSON.stringify(userDataLS as LSUserData));
      queryClient.invalidateQueries({
        queryKey: ["user-info", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["trainer-info", user?.id],
      });
      router.push("/user/profile");
    } catch (err) {
      setError({ message: (err as Error).message });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="text-2lg text-center">에러 발생.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>프로필 수정</title>
        <meta name="description" content="프로필 수정 페이지입니다." />
      </Head>

      <main className="pc:flex justify-center items-start gap-[32px] px-8">
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:mr-[16px] p-[4px] my-[24px]">
          <h1 className="py-2 px-8 border border-blue-300 rounded-full text-blue-300 text-2xl font-bold bg-blue-100">
            프로필 수정
          </h1>
          <ImageUploader
            id="profileImage"
            label="프로필 이미지"
            defImage={
              profileData?.profileImagePresignedUrl
                ? (profileData.profileImagePresignedUrl as string)
                : undefined
            }
            register={register("profileImage")}
          />
          <div className="w-full py-8 border-y">
            <Input
              id="name"
              label="이름"
              type="name"
              register={register("name", {
                required: "이름를 입력해 주세요.",
              })}
              placeholder="이름를 입력해 주세요."
            />
            {errors.name && <p className={error_class}>{errors.name.message}</p>}
          </div>
          <div className="w-full py-8 border-b">
            <Input
              id="phone"
              label="전화번호"
              type="phone"
              register={register("phone", {
                required: "전화번호를 입력해 주세요.",
                pattern: {
                  value: PHONE_REGEX,
                  message: "유효한 전화번호를 입력해 주세요.",
                },
              })}
              placeholder="전화번호를 입력해 주세요."
            />
            {errors.phone && <p className={error_class}>{errors.phone.message}</p>}
          </div>
          <div className={`${profile_menu} pt-4`}>
            <label className="text-lg font-semibold">성별</label>
            <div className="flex gap-[16px]">
              <label className="text-lg inline-block">
                <input {...register("gender")} type="radio" name="gender" value={Gender.MALE} />
                &nbsp;남성
              </label>
              <label className="text-lg inline-block">
                <input {...register("gender")} type="radio" name="gender" value={Gender.FEMALE} />
                &nbsp;여성
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:ml-[16px] p-[4px] my-[24px]">
          <div className={`${profile_menu} py-8 border-y pc:border-t-0 pc:mt-16`}>
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold">받고 싶은 레슨 유형</label>
              <div
                className="relative flex justify-center items-center w-8 h-8 p-3 border border-red-200 rounded-full text-red-200 text-md font-semibold bg-red-100"
                onMouseEnter={() => setIsLessonVisible(true)}
                onMouseLeave={() => setIsLessonVisible(false)}
              >
                !
                {isLessonVisible && (
                  <div className="absolute bottom-full left-full w-fit px-3 border border-red-200 rounded-t-xl rounded-br-xl text-nowrap text-red-200 text-md font-regular bg-red-100">
                    받고 싶은 레슨 유형은 <br className="block pc:hidden tablet:hidden" />
                    언제든지 수정 가능해요!
                  </div>
                )}
              </div>
            </div>
            <label className="text-lg">
              <input
                {...register("lessonType")}
                type="checkbox"
                name="lessonType"
                value={LessonType.SPORTS}
              />
              &nbsp;스포츠 (구기 스포츠, 계절 스포츠, 격투 스포츠 등)
            </label>
            <label className="text-lg">
              <input
                {...register("lessonType")}
                type="checkbox"
                name="lessonType"
                value={LessonType.FITNESS}
              />
              &nbsp;피트니스 (PT, 요가, 필라테스, 식단 관리 등)
            </label>
            <label className="text-lg">
              <input
                {...register("lessonType")}
                type="checkbox"
                name="lessonType"
                value={LessonType.REHAB}
              />
              &nbsp;재활치료
            </label>
          </div>
          <div className={`${profile_menu} py-4`}>
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold">내가 사는 지역</label>
              <div
                className="relative flex justify-center items-center w-8 h-8 p-3 border border-red-200 rounded-full text-red-200 text-md font-semibold bg-red-100"
                onMouseEnter={() => setIsRegionVisible(true)}
                onMouseLeave={() => setIsRegionVisible(false)}
              >
                !
                {isRegionVisible && (
                  <div className="absolute bottom-full left-full w-fit px-3 border border-red-200 rounded-t-xl rounded-br-xl text-nowrap text-red-200 text-md font-regular bg-red-100">
                    내가 사는 지역은 <br className="block pc:hidden tablet:hidden" />
                    언제든지 수정 가능해요!
                  </div>
                )}
              </div>
            </div>
            <Regions
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              register={register("region")}
            />
          </div>
          {/* <hr className="w-full border-[1px] border-solid border-gray-300" />
          <InputPassword
            id="currPassword"
            label="현재 비밀번호"
            pwdIsVisible={curPwdIsVisible}
            setPwdIsVisible={setCurPwdIsVisible}
            register={register("currPassword", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8글자 이상이어야 합니다.",
              },
            })}
            placeholder="비밀번호를 입력해 주세요."
          />
          {errors.currPassword && (
            <p className="text-red-400 text-sm">{errors.currPassword.message}</p>
          )}
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <p className={note_class}>* 비밀번호를 바꾸고 싶으실 경우에만 입력하세요.</p>
          <InputPassword
            id="password"
            label="새로운 비밀번호"
            pwdIsVisible={pwdIsVisible}
            setPwdIsVisible={setPwdIsVisible}
            register={register("password", {
              pattern: {
                value: PWD_REGEX,
                message: "비밀번호는 최소 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.",
              },
            })}
            placeholder="새로운 비밀번호를 입력해 주세요."
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          <InputPassword
            id="passwordComfirm"
            label="새로운 비밀번호 확인"
            pwdIsVisible={pwdCfmIsVisible}
            setPwdIsVisible={setPwdCfmIsVisible}
            register={register("passwordConfirm", {
              validate: (value) => {
                if (value !== watch("password")) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            })}
            placeholder="새로운 비밀번호를 다시 한번 입력해 주세요."
          />
          {errors.passwordConfirm && (
            <p className="text-red-400 text-sm">{errors.passwordConfirm.message}</p>
          )} */}
          <Button
            type="submit"
            className="hover:bg-blue-200 gap-4 w-full h-[5.4rem] bg-blue-300 text-white font-semibold"
          >
            수정하기 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
          </Button>
          <Button
            type="button"
            className="hover:bg-blue-100 w-full h-[5.4rem] border border-blue-300 bg-white text-blue-300 font-bold"
            onClick={() => {
              router.push(`/user/profile`);
            }}
          >
            취소하기
          </Button>
        </div>
      </main>
      <PopUp error={error} setError={setError} />
    </form>
  );
}

export default ProfileEdit;
