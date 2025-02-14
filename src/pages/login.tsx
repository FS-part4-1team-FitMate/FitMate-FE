import { useSetUser, useUser } from "@/contexts/UserProvider";
import { ic_google_sm, ic_kakao_sm, ic_naver_sm, logo_xl } from "@/imageExports";
import "dotenv/config";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postLogin } from "@/lib/api/authService";
import { EMAIL_REGEX, error_class } from "@/types/constants";
import { Role } from "@/types/types";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import InputPassword from "@/components/Common/InputPassword";
import PopUp from "@/components/Common/PopUp";

function LogIn() {
  const router = useRouter();
  const user = useUser();
  const setUser = useSetUser();
  const [error, setError] = useState<
    | null
    | Error
    | {
        message: string;
        onOK?: () => void;
        onCancel?: () => void;
      }
  >(null);
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const userData = JSON.parse(localStorage.getItem("userData")!);
      if (user.role === Role.USER) {
        if (user.hasProfile) {
          router.push("/user/my-lesson/active-lesson");
        } else {
          router.push("/user/profile/regist");
        }
      } else if (user.role === Role.TRAINER) {
        if (user.hasProfile) {
          router.push("/trainer/received-request");
        } else {
          router.push(`/trainer/${user.id}/profile/regist`);
        }
      }
    }
  }, [user]);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsSubmitting(true);
      const userData = await postLogin(data);
      if (userData && "message" in userData) {
        setError({ message: userData.message });
      }
      if (userData && "user" in userData) {
        const { user } = userData;
        user.hasProfile = userData.hasProfile;
        setUser(user);
        if (user.role === Role.USER) {
          if (user.hasProfile) {
            router.push("/user/my-lesson/active-lesson");
          } else {
            router.push("/user/profile/regist");
          }
        } else if (user.role === Role.TRAINER) {
          if (user.hasProfile) {
            router.push("/trainer/received-request");
          } else {
            router.push(`/trainer/${user.id}/profile/regist`);
          }
        }
      }
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (err) {
      setError({ message: (err as Error).message });
    }
    setIsSubmitting(false);
  };

  return (
    <main className="flex flex-col justify-center items-center gap-[32px] w-[384px] max-w-full mx-auto py-[4px] px-8 my-[64px]">
      <Head>
        <title>로그인 | 핏메이트</title>
        <meta name="description" content="핏메이트 로그인 페이지입니다." />
      </Head>
      <Image className="h-auto" src={logo_xl} alt="Logo" width={384} height={124} priority />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[16px] items-stretch w-full"
      >
        <div className="w-full">
          <Input
            id="email"
            label="이메일"
            type="email"
            register={register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: EMAIL_REGEX,
                message: "유효한 이메일을 입력해 주세요.",
              },
            })}
            placeholder="이메일"
          />
          {errors.email && <p className={error_class}>{errors.email.message}</p>}
        </div>
        <div className="w-full">
          <InputPassword
            id="password"
            label="비밀번호"
            register={register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8글자 이상이어야 합니다.",
              },
            })}
            placeholder="비밀번호"
            pwdIsVisible={pwdIsVisible}
            setPwdIsVisible={setPwdIsVisible}
          />
          {errors.password && <p className={error_class}>{errors.password.message}</p>}
        </div>
        <Button
          className="w-full h-[40px] text-lg rounded-3xl text-white font-semibold bg-blue-300 disabled:bg-slate-600"
          type="submit"
          disabled={!!errors.email || !!errors.password || isSubmitting}
        >
          로그인
        </Button>
      </form>
      <div className="flex flex-col items-center gap-4 pb-12 border-b">
        <p className="text-lg">아직 핏메이트 회원이 아니신가요?</p>
        <div className="flex gap-4 text-blue-600">
          <Link
            href="/user/signup"
            className="hover:bg-red-200 hover:text-white py-2 px-4 border border-red-200 rounded-full bg-red-100 text-red-200 text-md"
          >
            일반 회원가입
          </Link>
          <Link
            href="/trainer/signup"
            className="hover:bg-red-200 hover:text-white py-2 px-4 border border-red-200 rounded-full bg-red-100 text-red-200 text-md"
          >
            강사님 회원가입
          </Link>
        </div>
      </div>
      <div className="flex flex-col text-lg justify-center items-center gap-[8px]">
        <div>SNS 계정으로 로그인</div>
        <div className="flex justify-center items-center gap-[8px]">
          <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/google"}>
            <Image src={ic_google_sm} alt="google" width={40} height={40} />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/kakao"}>
            <Image src={ic_kakao_sm} alt="kakao" width={40} height={40} />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/naver"}>
            <Image src={ic_naver_sm} alt="naver" width={40} height={40} />
          </Link>
        </div>
      </div>
      <PopUp error={error} setError={setError} />
    </main>
  );
}

export default LogIn;
