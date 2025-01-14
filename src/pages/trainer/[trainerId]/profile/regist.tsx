import { useSetUser } from "@/contexts/UserProvider";
import { ic_designate_md } from "@/imageExports";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postProfile } from "@/lib/api/authService";
import { PHONE_REGEX, error_class, note_class, profile_menu } from "@/types/constants";
import { Gender, LessonType, LocationType, Region } from "@/types/types";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import PopUp from "@/components/Common/PopUp";
import Textarea from "@/components/Common/Textarea";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

function Regist() {
  const router = useRouter();
  const { trainerId } = router.query;
  const [selectedRegion, setSelectedRegion] = useState<Region[]>([]);
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
      name: "",
      phone: "",
      gender: Gender.MALE,
      lessonType: [],
      certification: undefined,
      region: [],
      locationType: [LocationType.OFFLINE],
      experience: 0,
      intro: "",
      description: "",
    } as {
      profileImage?: FileList;
      name: string;
      phone: string;
      gender: Gender;
      lessonType: LessonType[];
      certification?: FileList;
      region: Region[];
      locationType: LocationType[];
      experience: number;
      intro: string;
      description: string;
    },
  });

  const onSubmit = async (data: {
    profileImage?: FileList;
    name: string;
    phone: string;
    gender: Gender;
    lessonType: LessonType[];
    certification?: FileList;
    region: Region[];
    locationType: LocationType[];
    experience: number;
    intro: string;
    description: string;
  }) => {
    // data.region = selectedRegion;
    console.log(data); // TODO: remove this.
    try {
      const userData = await postProfile(data);
      if ("user" in userData) {
        setUser(userData.user);
      }
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (err) {
      setError({ message: (err as Error).message });
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <main className="pc:flex justify-center items-start gap-[32px]">
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:mr-[16px] p-[4px] my-[24px]">
          <div className={profile_menu}>
            <h1 className="text-xl font-bold">강사님 프로필 등록</h1>
            <p className="text-md">추가 정보를 입력하여 회원가입을 완료해주세요.</p>
          </div>
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className={profile_menu}>
            <label htmlFor="profileImage" className="text-lg font-semibold">
              프로필 이미지
            </label>
            <ImageUploader register={register("profileImage")} />
          </div>
          <hr className="w-full border-[1px] border-solid border-gray-300" />
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className={profile_menu}>
            <div className="flex flex-col gap-[8px]">
              <label className="text-lg font-semibold">제공 가능한 레슨 유형</label>
              <p className={note_class}>* 제공 가능한 레슨 유형은 언제든지 수정 가능해요!</p>
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className={profile_menu}>
            <label htmlFor="certification" className="text-lg font-semibold">
              자격증
            </label>
            <ImageUploader
              register={register("certification")}
              width={300}
              height={300}
              defImage={ic_designate_md.src}
            />
          </div>
          <hr className="w-full border-[1px] border-solid border-gray-300" />
        </div>
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:ml-[16px] p-[4px] my-[24px]">
          <div className={profile_menu}>
            <div className="flex flex-col gap-[8px]">
              <label className="text-lg font-semibold">내가 사는 지역</label>
              <p className={note_class}>* 내가 사는 지역은 언제든지 수정 가능해요!</p>
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className={profile_menu}>
            <div className="flex flex-col gap-[8px]">
              <label className="text-lg font-semibold">강의 주소 타입</label>
              <p className={note_class}>* 반드시 하나 이상을 선택해 주세요!</p>
            </div>
            <div className="flex gap-[16px]">
              <label className="text-lg">
                <input
                  {...register("locationType", {
                    validate: (value) =>
                      (value && value.length > 0) || "반드시 하나 이상을 선택해야 합니다.",
                  })}
                  type="checkbox"
                  name="locationType"
                  value={LocationType.OFFLINE}
                />
                &nbsp;오프라인
              </label>
              <label className="text-lg">
                <input
                  {...register("locationType", {
                    validate: (value) =>
                      (value && value.length > 0) || "반드시 하나 이상을 선택해야 합니다.",
                  })}
                  type="checkbox"
                  name="locationType"
                  value={LocationType.ONLINE}
                />
                &nbsp;온라인
              </label>
            </div>
            {errors.locationType && <p className={error_class}>{errors.locationType.message}</p>}
          </div>
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <Input
            id="experience"
            label="경력 (연, 소수점 입력 가능)"
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <Button type="submit" className="w-full bg-blue-500 text-white">
            시작하기
          </Button>
        </div>
      </main>
      <PopUp error={error} setError={setError} />
    </form>
  );
}

export default Regist;
