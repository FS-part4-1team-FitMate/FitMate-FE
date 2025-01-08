"use client";

import { useSetUser, useUser } from "@/contexts/UserProvider";
import { ic_edit_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { patchProfile } from "@/lib/api/authService";
import { Gender, LessonType, Profile, ProfileEdittable, Region } from "@/types/types";
import PopUp from "@/components/Common/PopUp";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

const PHONE_REGEX = /^\d{3}-?\d{3,4}-?\d{4}$/;

const profile_menu = clsx("flex flex-col items-start gap-[12px]");
const note_class = "text-sm text-slate-500";
const error_class = "text-red-400 text-sm";

const region_options = [
  { name: "서울", value: Region.SEOUL },
  { name: "경기", value: Region.GYEONGGI },
  { name: "인천", value: Region.INCHEON },
  { name: "대전", value: Region.DAEJEON },
  { name: "대구", value: Region.DAEGU },
  { name: "울산", value: Region.ULSAN },
  { name: "부산", value: Region.BUSAN },
  { name: "광주", value: Region.GWANGJU },
  { name: "세종", value: Region.SEJONG },
  { name: "강원", value: Region.GANGWON },
  { name: "충북", value: Region.CHUNGBUK },
  { name: "충남", value: Region.CHUNGNAM },
  { name: "전북", value: Region.JEONBUK },
  { name: "전남", value: Region.JEONNAM },
  { name: "경북", value: Region.GYEONGBUK },
  { name: "경남", value: Region.GYEONGNAM },
  { name: "제주", value: Region.JEJU },
];

function ProfileEdit() {
  const router = useRouter();
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
      profileImage: user?.profile?.profileImage,
      name: user?.profile?.name,
      phone: user?.profile?.phone,
      gender: user?.profile?.gender,
      lessonType: user?.profile?.lessonType,
      region: user?.profile?.region,
    } as Partial<ProfileEdittable>,
  });

  const onSubmit = async (data: Partial<ProfileEdittable>) => {
    const profile: ProfileEdittable = user.profile;
    const changedData = Object.keys(data).reduce<Partial<ProfileEdittable>>((acc, key) => {
      const typedKey = key as keyof ProfileEdittable;
      const newValue = data[typedKey];
      if (newValue !== undefined && newValue !== profile[typedKey]) {
        return { ...acc, [typedKey]: newValue };
      }
      return acc;
    }, {});
    if (data.region !== selectedRegion) {
      changedData.region = selectedRegion;
    }
    console.log(changedData); // TODO: remove this.
    try {
      const userData = await patchProfile(changedData);
      if ("user" in userData) {
        setUser(userData.user);
      }
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (err) {
      setError({ message: (err as Error).message });
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     router.push(`/login`);
  //   } else if (!user.profile) {
  //     router.push(`/user/profile/regist`);
  //   }
  // }, [user, router]);

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <main className="pc:flex justify-center items-start gap-[32px]">
        <div className="flex flex-col justify-normal items-start gap-[16px] w-[384px] max-w-full mx-auto pc:mr-[16px] p-[4px] my-[24px]">
          <div className={profile_menu}>
            <h1 className="text-xl font-bold">프로필 수정</h1>
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
            className="flex justify-center items-center w-full text-lg p-[8px] bg-blue-500 text-white rounded-2xl"
          >
            수정하기 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
          </button>
        </div>
      </main>
      <PopUp error={error} setError={setError} />
    </form>
  );
}

export default ProfileEdit;
