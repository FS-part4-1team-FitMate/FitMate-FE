import { useSetUser, useUser } from "@/contexts/UserProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { postProfile } from "@/lib/api/userService";
import { PHONE_REGEX, error_class, note_class, profile_menu } from "@/types/constants";
import { Gender, LessonType, Profile, Region } from "@/types/types";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import PopUp from "@/components/Common/PopUp";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

function Regist() {
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
      region: [],
      certificationCount: 0,
    } as {
      profileImage?: FileList;
      profileImageCount: number;
      contentType: string;
      name: string;
      phone: string;
      gender: Gender;
      lessonType: LessonType[];
      region: Region[];
      certificationCount: number;
    },
  });

  useEffect(() => {
    if (user?.id) {
      if (user.hasProfile) {
        router.push("/user/profile/edit");
      }
    }
  }, [user]);

  const onSubmit = async (data: Profile) => {
    let profileImageFileToUpload;
    if (data && "profileImage" in data) {
      const profileImage = data.profileImage;
      console.log(profileImage);
      if (profileImage instanceof FileList && data.profileImage?.length) {
        profileImageFileToUpload = profileImage[0];
        data.profileImageCount = 1;
        data.contentType = profileImage[0].type;
      }
      delete data.profileImage;
    }
    try {
      data.certificationCount = 0;
      const userData = await postProfile(data);
      if (userData && "profileImagePresignedUrl" in userData) {
        await axios.put(userData.profileImagePresignedUrl as string, profileImageFileToUpload);
      }
      const userDataLS = JSON.parse(localStorage.getItem("userData")!);
      userDataLS.user = { ...user, ...userData, hasProfile: true };
      setUser((prev) => userDataLS.user);
      localStorage.setItem("userData", JSON.stringify(userDataLS));
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="pc:flex justify-center items-start gap-[32px] px-8">
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:mr-[16px] p-[4px] my-[24px]">
          <div className={`${profile_menu} pb-8 border-b`}>
            <h1 className="py-2 px-8 border border-blue-300 rounded-full text-blue-300 text-2xl font-bold bg-blue-100">
              프로필 등록
            </h1>
            <p className="px-4 text-md">추가 정보를 입력하여 회원가입을 완료해주세요.</p>
          </div>
          <ImageUploader
            id="profileImage"
            label="프로필 이미지"
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
          <div className="py-8 border-y pc:border-t-0 pc:mt-16">
            <div className={profile_menu}>
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
          <div className="py-4">
            <div className={profile_menu}>
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
            </div>
            {errors.region && <p className={error_class}>{errors.region.message}</p>}
          </div>
          <Button
            type="submit"
            className="hover:bg-blue-200 w-full bg-blue-500 text-white font-semibold"
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
