import { useSetUser, useUser } from "@/contexts/UserProvider";
import { ic_designate_md, ic_edit_sm, ic_visibility_off, ic_visibility_on } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { patchProfile, postProfile } from "@/lib/api/authService";
import { Gender, LessonType, LocationType, ProfileEdittable, Region } from "@/types/types";
import PopUp from "@/components/Common/PopUp";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

const PHONE_REGEX = /^\d{3}-?\d{3,4}-?\d{4}$/;

const profile_menu = clsx("flex flex-col items-start gap-[12px]");
const note_class = "text-sm text-slate-500";
const error_class = "text-red-400 text-sm";

function ProfileEdit() {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [pwdCfmIsVisible, setPwdCfmIsVisible] = useState(false);
  const router = useRouter();
  const { trainerId } = router.query;
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
      certification: user?.profile?.certification,
      region: user?.profile?.region,
      locationType: user?.profile?.locationType,
      experience: user?.profile?.experience,
      intro: user?.profile?.intro,
      description: user?.profile?.description,
      currPassword: "",
      password: "",
      passwordConfirm: "",
    } as Partial<ProfileEdittable> & {
      currPassword: string;
      password: string;
      passwordConfirm: string;
    },
  });

  const onSubmit = async (data: Partial<ProfileEdittable>) => {
    // data.region = selectedRegion;
    console.log(data); // TODO: remove this.
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
          <div className="flex flex-col w-full gap-[12px]">
            <label className="text-lg font-semibold">경력 (연, 소수점 입력 가능)</label>
            <input
              className="text-md font-regular w-full h-[40px] p-[5px] rounded-xl border border-solid border-slate-600"
              type="number"
              {...register("experience", {
                min: {
                  value: 0,
                  message: "경력은 0년 이상이어야 합니다.",
                },
              })}
            />
          </div>
          {errors.experience && <p className={error_class}>{errors.experience.message}</p>}
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className="flex flex-col w-full gap-[12px]">
            <label className="text-lg font-semibold">한 줄 소개</label>
            <input
              className="text-md font-regular w-full h-[40px] p-[5px] rounded-xl border border-solid border-slate-600"
              type="text"
              {...register("intro")}
            />
          </div>
          {errors.intro && <p className={error_class}>{errors.intro.message}</p>}
          <hr className="w-full border-[1px] border-solid border-gray-300" />
          <div className="flex flex-col w-full gap-[12px]">
            <label className="text-lg font-semibold">상세 설명</label>
            <textarea
              className="text-md font-regular w-full rounded-xl p-[5px] border-[1px] border-solid border-gray-300 h-[160px] overflow-y-auto"
              {...register("description", {
                minLength: {
                  value: 10,
                  message: "상세 설명은 최소 10글자 이상이어야 합니다.",
                },
              })}
            ></textarea>
          </div>
          {errors.description && <p className={error_class}>{errors.description.message}</p>}
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
              type={pwdIsVisible ? "text" : "password"}
              id="currPassword"
              placeholder="비밀번호를 입력해 주세요."
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
          <button
            type="submit"
            className="flex justify-center items-center w-full text-lg p-[8px] bg-blue-500 text-white rounded-2xl disabled:bg-slate-600"
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
