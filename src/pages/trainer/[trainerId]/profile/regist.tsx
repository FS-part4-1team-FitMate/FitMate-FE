import { useSetUser, useUser } from "@/contexts/UserProvider";
import { img_default_md } from "@/imageExports";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { postProfile } from "@/lib/api/userService";
import { PHONE_REGEX, error_class, profile_menu } from "@/types/constants";
import { Gender, LSUserData, LessonType, Profile, Region } from "@/types/types";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import PopUp from "@/components/Common/PopUp";
import Textarea from "@/components/Common/Textarea";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

function Regist() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { trainerId } = router.query;
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
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      profileImage: undefined,
      profileImageCount: 0,
      contentType: "",
      name: "",
      phone: "",
      gender: Gender.MALE,
      lessonType: [],
      certification: undefined,
      certificationCount: 0,
      region: [],
      experience: 0,
      intro: "",
      description: "",
    } as {
      profileImage?: FileList;
      profileImageCount: number;
      contentType: string;
      name: string;
      phone: string;
      gender: Gender;
      lessonType: LessonType[];
      certification?: FileList;
      certificationCount: number;
      region: Region[];
      experience: number;
      intro: string;
      description: string;
    },
  });

  useEffect(() => {
    if (user?.id) {
      if (user.id !== trainerId) {
        router.push(`/trainer/${user.id}/profile/regist`);
      }
      if (user.hasProfile) {
        router.push(`/trainer/${user.id}/profile/edit`);
      }
    }
  }, [user]);

  const onSubmit = async (data: Profile) => {
    // data.region = selectedRegion;
    data.experience = Number(Number(data.experience).toFixed(0));
    console.log(data); // TODO: remove this.
    let profileImageFileToUpload;
    if ("profileImage" in data) {
      const profileImage = data.profileImage;
      if (profileImage instanceof FileList && data.profileImage?.length) {
        profileImageFileToUpload = profileImage[0];
        data.profileImageCount = 1;
        data.contentType = profileImage[0].type;
      }
      delete data.profileImage;
    }
    let certificationFileToUpload;
    if ("certification" in data) {
      const certification = data.certification;
      if (certification instanceof FileList && data.certification?.length) {
        certificationFileToUpload = certification[0];
        data.certificationCount = 1;
        data.contentType = certification[0].type;
      }
      delete data.certification;
    }
    try {
      const userProfile = await postProfile(data);
      if (userProfile && "profileImagePresignedUrl" in userProfile) {
        await axios.put(userProfile.profileImagePresignedUrl as string, profileImageFileToUpload);
      }
      if (userProfile && "certificationPresignedUrl" in userProfile) {
        await axios.put(userProfile.certificationPresignedUrl as string, certificationFileToUpload);
      }
      const userDataLS: LSUserData = JSON.parse(localStorage.getItem("userData")!);
      userDataLS.user = { ...userDataLS.user, ...userProfile, hasProfile: !!userProfile };
      setUser(() => userDataLS.user);
      localStorage.setItem("userData", JSON.stringify(userDataLS as LSUserData));
      queryClient.invalidateQueries({
        queryKey: ["user-info", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["trainer-info", user?.id],
      });
      router.push(`/trainer/${user?.id}/profile`);
    } catch (err) {
      setError({ message: (err as Error).message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="pc:flex justify-center items-start gap-[32px]">
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:mr-[16px] p-[4px] my-[24px]">
          <div className={profile_menu}>
            <h1 className="y-2 px-8 border border-blue-300 rounded-full text-blue-300 text-xl font-bold bg-blue-100">
              강사님 프로필 등록
            </h1>
            <p className="px-4 text-md">추가 정보를 입력하여 회원가입을 완료해주세요.</p>
          </div>
          <ImageUploader
            id="profileImage"
            label="프로필 이미지"
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
          <div className="w-full py-4 border-y">
            <div className={profile_menu}>
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
          <div className="w-full pb-4 border-b">
            <div className={profile_menu}>
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
                </div>{" "}
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
            </div>
            {errors.lessonType && <p className={error_class}>{errors.lessonType.message}</p>}
          </div>
          <ImageUploader
            id="certification"
            label="자격증"
            register={register("certification")}
            width={300}
            height={300}
            defImage={img_default_md.src}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:ml-[16px] p-[4px] my-[24px]">
          <div className={`${profile_menu} pc:mt-[5.2rem] py-4 border-y pc:border-t-0`}>
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
                    서비스 가능 지역은 <br className="block pc:hidden tablet:hidden" />
                    언제든지 수정 가능해요!
                  </div>
                )}
              </div>{" "}
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
                required: "경력 연수를 입력해 주세요.",
                min: {
                  value: 0,
                  message: "경력은 0년 이상이어야 합니다.",
                },
              })}
              placeholder="경력 연수를 입력해 주세요."
            />
            {errors.experience && <p className={error_class}>{errors.experience.message}</p>}
          </div>
          <div className="w-full py-4 border-y">
            <Input
              id="intro"
              label="한 줄 소개"
              type="text"
              register={register("intro", {
                required: "한 줄 소개를 입력해 주세요.",
                minLength: {
                  value: 10,
                  message: "최소 10자 이상 입력해 주세요.",
                },
              })}
              placeholder="한 줄 소개를 입력해 주세요."
            />
            {errors.intro && <p className={error_class}>{errors.intro.message}</p>}
          </div>
          <div className="w-full pb-4">
            <Textarea
              id="description"
              label="상세 설명"
              placeholder="상세 설명을 작성해 주세요."
              register={register("description", {
                required: "상세 설명을 작성해 주세요.",
                minLength: {
                  value: 10,
                  message: "상세 설명은 최소 10글자 이상이어야 합니다.",
                },
              })}
            ></Textarea>
            {errors.description && <p className={error_class}>{errors.description.message}</p>}
          </div>
          <Button
            type="submit"
            className="hover:bg-blue-200 w-full bg-blue-300 text-white font-semibold"
          >
            시작하기
          </Button>
        </div>
      </main>
      <PopUp error={error} setError={setError} />
    </form>
  );
}

export default Regist;
