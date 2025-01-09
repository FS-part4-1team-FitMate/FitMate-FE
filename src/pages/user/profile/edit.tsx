import { useSetUser, useUser } from "@/contexts/UserProvider";
import { ic_edit_sm } from "@/imageExports";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { patchProfile } from "@/lib/api/authService";
import { PHONE_REGEX, PWD_REGEX, error_class, note_class, profile_menu } from "@/types/constants";
import { Gender, LessonType, ProfileEdittable, Region } from "@/types/types";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import InputPassword from "@/components/Common/InputPassword";
import PopUp from "@/components/Common/PopUp";
import Regions from "@/components/Profile/Regions";
import ImageUploader from "@/components/SignUp/ImageUploader";

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
