import { useSetUser, useUser } from "@/contexts/UserProvider";
import { ic_edit_sm, img_default_md } from "@/imageExports";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "@/lib/api/queries/user";
import { patchProfile } from "@/lib/api/userService";
import { PHONE_REGEX, error_class, profile_menu } from "@/types/constants";
import { Gender, LSUserData, LessonType, ProfileEdittable, Region } from "@/types/types";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import Loading from "@/components/Common/Loading";
import PopUp, { CustomError } from "@/components/Common/PopUp";
import Textarea from "@/components/Common/Textarea";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

type FormType = Partial<ProfileEdittable>;
//  & {
//   currPassword: string;
//   password: string;
//   passwordConfirm: string;
// };

function ProfileEdit() {
  const queryClient = useQueryClient();
  // const [curPwdIsVisible, setCurPwdIsVisible] = useState(false);
  // const [pwdIsVisible, setPwdIsVisible] = useState(false);
  // const [pwdCfmIsVisible, setPwdCfmIsVisible] = useState(false);
  const router = useRouter();
  const { trainerId } = router.query;
  const [isLessonVisible, setIsLessonVisible] = useState<boolean>(false);
  const [isRegionVisible, setIsRegionVisible] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<Region[]>([]);
  const user = useUser();
  const setUser = useSetUser();
  const [error, setError] = useState<CustomError>(null);
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
      certification: user?.profile?.certification,
      certificationCount: 0,
      region: user?.profile?.region,
      locationType: user?.profile?.locationType,
      experience: user?.profile?.experience,
      intro: user?.profile?.intro,
      description: user?.profile?.description,
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
      // data.region = selectedRegion;
      const profile: ProfileEdittable = profileData?.profile!;
      const changedData = Object.keys(data).reduce<Partial<ProfileEdittable>>((acc, key) => {
        const typedKey = key as keyof ProfileEdittable;
        const newValue = data[typedKey];
        if (newValue !== undefined && newValue !== profile?.[typedKey]) {
          return { ...acc, [typedKey]: newValue };
        }
        return acc;
      }, {});
      if (data.region !== selectedRegion) {
        changedData.region = selectedRegion;
      }
      if (changedData.experience) {
        changedData.experience = Number(Number(changedData.experience).toFixed(0));
      }
      let profileImageFileToUpload;
      if (changedData && "profileImage" in changedData && changedData?.profileImage?.length) {
        const profileImage = changedData.profileImage;
        if (profileImage instanceof FileList && profileImage[0]?.name) {
          profileImageFileToUpload = profileImage[0];
          changedData.profileImageCount = 1;
          changedData.contentType = profileImage[0].type;
          delete changedData.profileImage;
        }
      }
      let certificationFileToUpload;
      if (changedData && "certification" in changedData && changedData?.certification?.length) {
        const certification = changedData.certification;
        if (certification instanceof FileList && certification[0]?.name) {
          certificationFileToUpload = certification[0];
          changedData.certificationCount = 1;
          changedData.contentType = certification[0].type;
          delete changedData.certification;
        }
      }

      delete changedData.updatedAt;
      const userProfile = await patchProfile(user?.id!, changedData);
      if (userProfile && "profileImagePresignedUrl" in userProfile) {
        await axios.put(userProfile.profileImagePresignedUrl as string, profileImageFileToUpload);
      }
      if (userProfile && "certificationPresignedUrl" in userProfile) {
        await axios.put(userProfile.certificationPresignedUrl as string, certificationFileToUpload);
      }
      try {
        const userDataLS: LSUserData = JSON.parse(localStorage.getItem("userData")!);
        userDataLS.user = {
          ...userDataLS.user,
          ...userProfile,
          hasProfile: !!userProfile?.profile?.id,
        };
        userDataLS.hasProfile = !!userProfile?.profile?.id;
        setUser(() => userDataLS.user);
        localStorage.setItem("userData", JSON.stringify(userDataLS as LSUserData));
        queryClient.invalidateQueries({
          queryKey: ["user-info", user?.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["trainer-info", user?.id],
        });
        setError({
          message: "프로필이 수정되었습니다.",
          onCancel: () => router.push(`/trainer/${user?.id}/profile`),
        });
        router.push(`/trainer/${user?.id}/profile`);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("userData");
        setUser(null);
        router.push(`/login`);
      }
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
        <title>강사님 프로필 수정</title>
        <meta name="description" content="강사님 프로필 수정 페이지입니다." />
      </Head>
      <main className="pc:flex justify-center items-start gap-[32px] px-8">
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:mr-[16px] p-[4px] my-[24px]">
          <div className={profile_menu}>
            <h1 className="py-2 px-8 border border-blue-300 rounded-full text-blue-300 text-xl font-bold bg-blue-100">
              강사님 프로필 수정
            </h1>
          </div>
          <ImageUploader
            id="profileImage"
            label="프로필 이미지"
            defImage={
              profileData?.profileImagePresignedUrl
                ? profileData.profileImagePresignedUrl
                : undefined
            }
            register={register("profileImage")}
          />
          <div className="w-full py-4 border-y">
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
          <div className="w-full">
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
          <div className={`${profile_menu} py-4 border-y`}>
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
          <div className={`${profile_menu} pb-4 border-b`}>
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold">제공 가능한 레슨 유형</label>
              <div
                className="relative flex justify-center items-center w-8 h-8 p-3 border border-red-200 rounded-full text-red-200 text-md font-semibold bg-red-100"
                onMouseEnter={() => setIsLessonVisible(true)}
                onMouseLeave={() => setIsLessonVisible(false)}
              >
                !
                {isLessonVisible && (
                  <div className="absolute bottom-full left-full w-fit px-3 border border-red-200 rounded-t-xl rounded-br-xl text-nowrap text-red-200 text-md font-regular bg-red-100">
                    제공 가능한 레슨 유형은 <br className="block pc:hidden tablet:hidden" />
                    언제든지 수정 가능해요!
                  </div>
                )}
              </div>
            </div>
            <label className="text-lg">
              <input
                {...register("lessonType", {
                  validate: (value) =>
                    (value && value.length > 0) || "반드시 하나 이상을 선택해야 합니다.",
                })}
                type="checkbox"
                name="lessonType"
                value={LessonType.SPORTS}
              />
              &nbsp;스포츠 (구기 스포츠, 계절 스포츠, 격투 스포츠 등)
            </label>
            <label className="text-lg">
              <input
                {...register("lessonType", {
                  validate: (value) =>
                    (value && value.length > 0) || "반드시 하나 이상을 선택해야 합니다.",
                })}
                type="checkbox"
                name="lessonType"
                value={LessonType.FITNESS}
              />
              &nbsp;피트니스 (PT, 요가, 필라테스, 식단 관리 등)
            </label>
            <label className="text-lg">
              <input
                {...register("lessonType", {
                  validate: (value) =>
                    (value && value.length > 0) || "반드시 하나 이상을 선택해야 합니다.",
                })}
                type="checkbox"
                name="lessonType"
                value={LessonType.REHAB}
              />
              &nbsp;재활치료
            </label>
            {errors.lessonType && <p className={error_class}>{errors.lessonType.message}</p>}
          </div>
          <ImageUploader
            id="certification"
            label="자격증"
            register={register("certification")}
            width={300}
            height={300}
            defImage={
              profileData?.certificationPresignedUrl
                ? profileData.certificationPresignedUrl
                : img_default_md.src
            }
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:ml-[16px] p-[4px] my-[24px]">
          <div className={`${profile_menu} pc:mt-[5.2rem] py-4 border-y pc:border-t-0`}>
            <div className="flex items-center gap-4">
              <label className="text-lg font-semibold">서비스 가능 지역</label>
              <div
                className="relative flex justify-center items-center w-8 h-8 p-3 border border-red-200 rounded-full text-red-200 text-md font-semibold bg-red-100"
                onMouseEnter={() => setIsRegionVisible(true)}
                onMouseLeave={() => setIsRegionVisible(false)}
              >
                !
                {isRegionVisible && (
                  <div className="absolute bottom-full left-full w-fit px-3 border border-red-200 rounded-t-xl rounded-br-xl text-nowrap text-red-200 text-md font-regular bg-red-100">
                    서비스 가능 지역은 <br className="block pc:hidden tablet:hidden" />
                    언제든지 수정 가능해요!
                  </div>
                )}
              </div>
            </div>
            <Regions
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              register={register("region", {
                validate: (value) =>
                  (value && value.length > 0) || "반드시 하나 이상을 선택해야 합니다.",
              })}
            />
            {errors.region && <p className={error_class}>{errors.region.message}</p>}
          </div>
          <div className="w-full">
            <Input
              id="experience"
              label="경력 (연, 소수점 입력 불가)"
              type="number"
              register={register("experience", {
                min: {
                  value: 0,
                  message: "경력은 0년 이상이어야 합니다.",
                },
              })}
              placeholder="경력을 입력해 주세요."
            />
            {errors.experience && <p className={error_class}>{errors.experience.message}</p>}
          </div>
          <div className="w-full py-5 border-y">
            <Input
              id="intro"
              label="한 줄 소개"
              type="text"
              register={register("intro")}
              placeholder="한 줄 소개를 입력해 주세요."
            />
            {errors.intro && <p className={error_class}>{errors.intro.message}</p>}
          </div>
          <div className="w-full">
            <Textarea
              id="description"
              label="상세 설명"
              register={register("description", {
                minLength: {
                  value: 10,
                  message: "상세 설명은 최소 10글자 이상이어야 합니다.",
                },
              })}
              placeholder="상세 설명을 입력해 주세요."
            ></Textarea>
            {errors.description && <p className={error_class}>{errors.description.message}</p>}
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
            placeholder="현재 비밀번호를 입력해 주세요."
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
            className="hover:bg-blue-200 gap-4 w-full bg-blue-500 text-white font-semibold disabled:bg-slate-600"
          >
            수정하기 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
          </Button>
          <Button
            type="button"
            className="hover:bg-blue-100 w-full border border-blue-300 bg-white text-blue-300 font-bold"
            onClick={() => {
              router.push(`/trainer/${trainerId}/profile`);
            }}
          >
            취소하기
          </Button>
        </div>
      </main>
      <PopUp error={error} setError={setError} onlyCancel={true} />
    </form>
  );
}

export default ProfileEdit;
