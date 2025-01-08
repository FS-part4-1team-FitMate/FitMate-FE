import { useSetUser } from "@/contexts/UserProvider";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postProfile } from "@/lib/api/authService";
import { Gender, LessonType, Region } from "@/types/types";
import PopUp from "@/components/Common/PopUp";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

const PHONE_REGEX = /^\d{3}-?\d{3,4}-?\d{4}$/;

const profile_menu = clsx("flex flex-col items-start gap-[12px]");
const note_class = "text-sm text-slate-500";
const error_class = "text-red-400 text-sm";

function Regist() {
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
      region: [],
    } as {
      profileImage?: FileList;
      name: string;
      phone: string;
      gender: Gender;
      lessonType: LessonType[];
      region: Region[];
    },
  });

  const onSubmit = async (data: {
    profileImage?: FileList;
    name: string;
    phone: string;
    gender: Gender;
    lessonType: LessonType[];
    region: Region[];
  }) => {
    data.region = selectedRegion;
    console.log(data);
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
            <h1 className="text-xl font-bold">프로필 등록</h1>
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
          <div className="flex flex-col w-full gap-[12px]">
            <label className="w-full text-lg font-semibold" htmlFor="name">
              이름
            </label>
            <input
              className="w-full text-lg p-[8px] h-[40px] text-slate-700 border border-gray-300 rounded-2xl"
              {...register("name", {
                required: "이름를 입력해 주세요.",
              })}
              type="name"
              id="name"
              placeholder="이름를 입력해 주세요."
            />
            {errors.name && <p className={error_class}>{errors.name.message}</p>}
          </div>
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className="flex flex-col w-full gap-[12px]">
            <label className="w-full text-lg font-semibold" htmlFor="phone">
              전화번호
            </label>
            <input
              className="w-full text-lg p-[8px] h-[40px] text-slate-700 border border-gray-300 rounded-2xl"
              {...register("phone", {
                required: "전화번호를 입력해 주세요.",
                pattern: {
                  value: PHONE_REGEX,
                  message: "유효한 전화번호를 입력해 주세요.",
                },
              })}
              type="phone"
              id="phone"
              placeholder="전화번호를 입력해 주세요."
            />
            {errors.phone && <p className={error_class}>{errors.phone.message}</p>}
          </div>
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
        </div>
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:ml-[16px] p-[4px] my-[24px]">
          <div className={profile_menu}>
            <div className="flex flex-col gap-[8px]">
              <label className="text-lg font-semibold">받고 싶은 레슨 유형</label>
              <p className={note_class}>* 받고 싶은 레슨 유형은 언제든지 수정 가능해요!</p>
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
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className={profile_menu}>
            <div className="flex flex-col gap-[8px]">
              <label className="text-lg font-semibold">내가 사는 지역</label>
              <p className={note_class}>* 내가 사는 지역은 언제든지 수정 가능해요!</p>
            </div>
            <Regions
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              register={register("region")}
            />
          </div>
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <button
            type="submit"
            className="w-full text-lg p-[8px] bg-blue-500 text-white rounded-2xl"
          >
            시작하기
          </button>
        </div>
      </main>
      <PopUp error={error} setError={setError} />
    </form>
  );
}

export default Regist;
