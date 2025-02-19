import { useSetUser } from "@/contexts/UserProvider";
import { ic_google_sm, ic_kakao_sm, ic_naver_sm, logo_xl } from "@/imageExports";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  checkEmailVeriKey,
  postSignUpTrainer,
  postSignUpUser,
  sendEmailVeriKey,
} from "@/lib/api/authService";
import { EMAIL_REGEX, PWD_REGEX, error_class } from "@/types/constants";
import { Role } from "@/types/types";
import PopUp from "@/components/Common/PopUp";
import Button from "../Common/Button";
import Input from "../Common/Input";
import InputPassword from "../Common/InputPassword";

const input_class =
  "w-full text-lg p-[8px] h-[40px] text-slate-700 border border-gray-300 rounded-2xl";

interface Props {
  role: Role;
}

function SignUpForm({ role }: Props) {
  const router = useRouter();
  const setUser = useSetUser();
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [emailVeriKeyOpen, setEmailVeriKeyOpen] = useState(false);
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
  const [pwdCfmIsVisible, setPwdCfmIsVisible] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      emailVeriKey: "",
    },
  });
  const onSubmit = async (data: {
    nickname: string;
    email: string;
    password: string;
    passwordConfirm?: string;
    emailVeriKey?: string;
  }) => {
    if (data.password !== data.passwordConfirm) {
      setError({ message: "비밀번호가 일치하지 않습니다." });
      return;
    }
    try {
      delete data.passwordConfirm;
      delete data.emailVeriKey;
      let userData;
      if (role === Role.USER) {
        userData = await postSignUpUser({ ...data });
      } else if (role === Role.TRAINER) {
        userData = await postSignUpTrainer({ ...data });
      }
      if (userData && "message" in userData!) {
        setError({ message: userData.message });
      }
      if (userData && "user" in userData) {
        setUser(userData.user);
        localStorage.setItem("userData", JSON.stringify(userData));
        if (userData.user.role === Role.USER) {
          router.push(`/user/profile/regist`);
        } else if (userData.user.role === Role.TRAINER) {
          router.push(`/trainer/${userData.user.id}/profile/regist`);
        }
      }
    } catch (err) {
      setError({ message: (err as Error).message });
    }
  };

  return (
    <main className="flex flex-col justify-center items-center gap-[32px] w-[384px] max-w-full mx-auto py-[4px] px-8 my-[64px]">
      <Head>
        <title>회원 가입 | 핏메이트</title>
        <meta name="description" content="핏메이트 회원 가입 페이지입니다." />
      </Head>
      <Image className="h-auto" src={logo_xl} alt="Logo" width={384} height={124} priority />
      <div className="text-lg flex flex-col items-center">
        {role === Role.USER ? (
          <>
            <div className="text-xl font-semibold mx-auto">일반회원 가입 페이지</div>
            <div>
              강사님 이신가요?{" "}
              <Link href="/trainer/signup" className="text-blue-600">
                강사님 전용 페이지
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-xl font-semibold mx-auto">강사님 회원 가입 페이지</div>
            <div>
              일반회원 이신가요?{" "}
              <Link href="/user/signup" className="text-blue-600">
                일반회원 전용 페이지
              </Link>
            </div>
          </>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[16px] items-stretch w-full"
      >
        <div>
          <Input
            id="nickname"
            label="닉네임"
            type="text"
            register={register("nickname", {
              required: "닉네임을 입력해 주세요.",
            })}
            placeholder="닉네임을 입력해 주세요."
          />
          {errors.nickname && <p className={error_class}>{errors.nickname.message}</p>}
        </div>
        <div>
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
            placeholder="이메일을 입력해 주세요."
            disabled={!!emailVerified}
          />
          {errors.email && <p className={error_class}>{errors.email.message}</p>}
        </div>
        <Button
          className="inline-block text-md bg-blue-300 text-white w-fit py-2 px-4 rounded-full"
          onClick={() => {
            const msg = sendEmailVeriKey(watch("email"));
            setEmailVeriKeyOpen(true);
          }}
        >
          이메일 인증하기
        </Button>
        {emailVeriKeyOpen && (
          <>
            <div className="flex flex-col">
              <div className="flex gap-[10px] justify-normal items-center">
                <label htmlFor="emailVeriKey" className="inline-block text-md">
                  인증번호:
                </label>
                <input
                  id="emailVeriKey"
                  type="text"
                  className="focus:outline focus:outline-blue-300 inline-block text-md bg-white text-slate-700 rounded-md w-[100px] px-[10px] h-[30px] border border-gray-300"
                  {...register("emailVeriKey", {
                    required: "인증번호를 입력해 주세요.",
                    validate: (value) => {
                      if (value.length !== 6) {
                        return "6자리를 입력해주세요.";
                      }
                      return true;
                    },
                  })}
                  placeholder="인증번호"
                />
                <Button
                  className="inline-block text-md bg-blue-300 text-white py-1 px-4 rounded-full"
                  type="button"
                  onClick={async () => {
                    const res = await checkEmailVeriKey({
                      email: watch("email"),
                      code: watch("emailVeriKey"),
                    });
                    console.log(res);
                    setError({ message: res.message });
                    if (res.message === "이메일 인증 성공") {
                      setEmailVerified(true);
                      setEmailVeriKeyOpen(true);
                    } else {
                      setEmailVerified(false);
                      setEmailVeriKeyOpen(true);
                    }
                  }}
                >
                  확인
                </Button>
              </div>
              {errors.emailVeriKey && <p className={error_class}>{errors.emailVeriKey.message}</p>}
            </div>
          </>
        )}
        {emailVerified === null ? (
          <></>
        ) : emailVerified ? (
          <p className="text-green-400 text-sm">이메일 인증 성공</p>
        ) : (
          <p className="text-red-400 text-sm">이메일 인증 실패</p>
        )}
        <div>
          <InputPassword
            id="password"
            label="비밀번호"
            register={register("password", {
              required: "비밀번호를 입력해 주세요.",
              pattern: {
                value: PWD_REGEX,
                message: "비밀번호는 최소 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.",
              },
            })}
            placeholder="비밀번호를 입력해 주세요."
            pwdIsVisible={pwdIsVisible}
            setPwdIsVisible={setPwdIsVisible}
          />
          {errors.password && <p className={error_class}>{errors.password.message}</p>}
        </div>
        <div>
          <InputPassword
            id="passwordConfirm"
            label="비밀번호 확인"
            register={register("passwordConfirm", {
              required: "비밀번호를 다시 한번 입력해 주세요.",
              validate: (value) => {
                if (value !== watch("password")) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            })}
            placeholder="비밀번호를 다시 한번 입력해 주세요."
            pwdIsVisible={pwdCfmIsVisible}
            setPwdIsVisible={setPwdCfmIsVisible}
          />
          {errors.passwordConfirm && (
            <p className={error_class}>{errors.passwordConfirm.message}</p>
          )}
        </div>
        <Button
          className="w-full h-[40px] text-lg rounded-2xl text-white bg-blue-300 disabled:bg-slate-600"
          type="submit"
          disabled={
            !!errors.nickname ||
            !!errors.email ||
            !!errors.password ||
            !!errors.passwordConfirm ||
            !emailVerified
          }
        >
          {role === Role.USER ? "일반회원 " : "강사님으로 "}가입하기
        </Button>
      </form>
      <div className="flex flex-col text-lg justify-center items-center gap-[8px]">
        <div>SNS 계정으로 간편 가입하기</div>
        <div className="flex justify-center items-center gap-[8px]">
          <Link href={process.env.NEXT_PUBLIC_API_URL + `/auth/google?role=${role}`}>
            <Image src={ic_google_sm} alt="google" width={40} height={40} />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_API_URL + `/auth/kakao?role=${role}`}>
            <Image src={ic_kakao_sm} alt="kakao" width={40} height={40} />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_API_URL + `/auth/naver?role=${role}`}>
            <Image src={ic_naver_sm} alt="naver" width={40} height={40} />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4 text-lg">
        이미 핏메이트 회원이신가요?{" "}
        <Link
          href="/login"
          className="hover:bg-red-200 hover:text-white py-2 px-4 border border-red-200 rounded-full bg-red-100 text-red-200 text-md"
        >
          로그인
        </Link>
      </div>
      <PopUp error={error} setError={setError} />
    </main>
  );
}

export default SignUpForm;
