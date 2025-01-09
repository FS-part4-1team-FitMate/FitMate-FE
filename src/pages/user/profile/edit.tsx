"use client";

import { useSetUser, useUser } from "@/contexts/UserProvider";
import { ic_edit_sm, ic_visibility_off, ic_visibility_on } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { patchProfile } from "@/lib/api/authService";
import { Gender, LessonType, ProfileEdittable, Region } from "@/types/types";
import Button from "@/components/Common/Button";
import PopUp from "@/components/Common/PopUp";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

const PHONE_REGEX = /^\d{3}-?\d{3,4}-?\d{4}$/;

const profile_menu = clsx("flex flex-col items-start gap-[12px]");
const note_class = "text-sm text-slate-500";
const error_class = "text-red-400 text-sm";

type FormType = Partial<ProfileEdittable> & {
  currPassword: string;
  password: string;
  passwordConfirm: string;
};

function ProfileEdit() {
  const [curPwdIsVisible, setCurPwdIsVisible] = useState(false);
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [pwdCfmIsVisible, setPwdCfmIsVisible] = useState(false);
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<Region[]>([]);
  const user = useUser();
  const setUser = useSetUser();
  const [error, setError] = useState<
    null | Error | { message: string; onOK?: () => void; onCancel?: () => void }
  >(null);
  const {
    register,
    watch,
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
      currPassword: "",
      password: "",
      passwordConfirm: "",
    } as FormType,
  });

  const onSubmit = async (data: FormType) => {
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
          <label className="w-full text-lg font-semibold" htmlFor="currPassword">
            현재 비밀번호
          </label>
          <div className="relative w-full h-[40px] text-slate-700">
            <input
              className="w-full h-full text-lg p-[8px] border border-gray-300 rounded-2xl"
              {...register("currPassword", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8글자 이상이어야 합니다.",
                },
              })}
              type={curPwdIsVisible ? "text" : "password"}
              id="currPassword"
              placeholder="비밀번호를 입력해 주세요."
            />
            <Image
              className="absolute right-[8px] top-[8px] bottom-[8px]"
              width={24}
              height={24}
              src={curPwdIsVisible ? ic_visibility_on : ic_visibility_off}
              alt="eye"
              onClick={() => setCurPwdIsVisible((prev) => !prev)}
            />
          </div>
          {errors.currPassword && (
            <p className="text-red-400 text-sm">{errors.currPassword.message}</p>
          )}
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <label className="w-full text-lg font-semibold" htmlFor="password">
            새로운 비밀번호
          </label>
          <p className={note_class}>* 비밀번호를 바꾸고 싶으실 경우에만 입력하세요.</p>
          <div className="relative w-full h-[40px] text-slate-700">
            <input
              className="w-full h-full text-lg p-[8px] border border-gray-300 rounded-2xl"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8글자 이상이어야 합니다.",
                },
              })}
              type={pwdIsVisible ? "text" : "password"}
              id="password"
              placeholder="새로운 비밀번호를 입력해 주세요."
            />
            <Image
              className="absolute right-[8px] top-[8px] bottom-[8px]"
              width={24}
              height={24}
              src={pwdIsVisible ? ic_visibility_on : ic_visibility_off}
              alt="eye"
              onClick={() => setPwdIsVisible((prev) => !prev)}
            />
          </div>
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          <label className="w-full text-lg font-semibold" htmlFor="passwordConfirm">
            새로운 비밀번호 확인
          </label>
          <div className="relative w-full h-[40px] text-slate-700">
            <input
              className="w-full h-full text-lg p-[8px] border border-gray-300 rounded-2xl"
              {...register("passwordConfirm", {
                validate: (value) => {
                  if (value !== watch("password")) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                },
              })}
              type={pwdCfmIsVisible ? "text" : "password"}
              id="passwordComfirm"
              placeholder="새로운 비밀번호를 다시 한번 입력해 주세요."
            />
            <Image
              className="absolute right-[8px] top-[8px] bottom-[8px]"
              width={24}
              height={24}
              src={pwdCfmIsVisible ? ic_visibility_on : ic_visibility_off}
              alt="eye"
              onClick={() => setPwdCfmIsVisible((prev) => !prev)}
            />
          </div>
          {errors.passwordConfirm && (
            <p className="text-red-400 text-sm">{errors.passwordConfirm.message}</p>
          )}
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <Button type="submit" className="w-full bg-blue-500 text-white">
            수정하기 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
          </Button>
          <Button
            type="button"
            className="w-full border border-solid border-slate-800 bg-slate-200 text-black-500"
            onClick={() => router.push(`/user/profile`)}
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
