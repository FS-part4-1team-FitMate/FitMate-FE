import PopUp from "@/components/PopUp";
import { useSetUser } from "@/contexts/UserProvider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../login";
import { postSignUp } from "@/lib/api/authService";
import { ic_google_sm, ic_kakao_sm, ic_naver_sm, ic_visibility_off, ic_visibility_on, logo_xl } from "@/imageExports";

function SignUp() {
  const setUser = useSetUser();
  const [error, setError] = useState<null | Error | {
    message: string;
    onOK?: () => void;
    onCancel?: () => void;
  }>(null);
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [pwdCfmIsVisible, setPwdCfmIsVisible] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
    }
  });

  const onSubmit = async (data: { name: string; email: string; phone: string; password: string; passwordConfirm: string }) => {
    if (data.password !== data.passwordConfirm) {
      setError({ message: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    try {
      const userData = await postSignUp(data);
      if ('user' in userData) {
        setUser(userData.user);
      }
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (err) {
      setError({ message: (err as Error).message });
    }
  }

  return (
    <main className="flex flex-col justify-center items-center gap-[32px] h-screen w-[384px] max-w-full mx-auto p-[4px]">
      <Image src={logo_xl} alt="Logo" width={384} height={124} priority />
      <div className="text-lg">강사님 이신가요? <Link href="/trainer/signup">강사님 전용 페이지</Link></div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px] items-stretch w-full">
        <label className="w-full text-lg" htmlFor="name">이름</label>
        <input className="w-full text-lg p-[8px] h-[40px] text-slate-700 border border-gray-300 rounded-2xl"
          {...register('name', {
            required: '이름을 입력해 주세요.',
          })}
          type="text"
          id="name"
          placeholder="성함을 입력해 주세요."
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
        <label className="w-full text-lg" htmlFor="email">이메일</label>
        <input className="w-full text-lg p-[8px] h-[40px] text-slate-700 border border-gray-300 rounded-2xl"
          {...register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: EMAIL_REGEX,
              message: '유효한 이메일을 입력해 주세요.',
            },
          })}
          type="email"
          id="email"
          placeholder="이메일"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        <label className="w-full text-lg" htmlFor="password">비밀번호</label>
        <div className="relative w-full h-[40px] text-slate-700">
          <input className="w-full h-full text-lg p-[8px] border border-gray-300 rounded-2xl"
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8글자 이상이어야 합니다.',
              },
            })}
            type={pwdIsVisible ? "text" : "password"}
            id="password"
            placeholder="비밀번호"
          />
          <Image className="absolute right-[8px] top-[8px] bottom-[8px]" width={24} height={24} src={pwdIsVisible ? ic_visibility_on : ic_visibility_off} alt="eye" onClick={() => setPwdIsVisible((prev) => !prev)} />
        </div>
        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        <label className="w-full text-lg" htmlFor="passwordConfirm">비밀번호 확인</label>
        <div className="relative w-full h-[40px] text-slate-700">
          <input className="w-full h-full text-lg p-[8px] border border-gray-300 rounded-2xl"
            {...register('passwordConfirm', {
              required: '비밀번호를 다시 한번 입력해 주세요.',
              validate: (value) => {
                if (value !== watch('password')) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            })}
            type={pwdCfmIsVisible ? "text" : "password"}
            id="passwordComfirm"
            placeholder="비밀번호"
          />
          <Image className="absolute right-[8px] top-[8px] bottom-[8px]" width={24} height={24} src={pwdCfmIsVisible ? ic_visibility_on : ic_visibility_off} alt="eye" onClick={() => setPwdCfmIsVisible((prev) => !prev)} />
        </div>
        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        <button className="w-full h-[40px] text-lg rounded-2xl text-white bg-blue-600 disabled:bg-slate-600" type="submit" disabled={!!errors.name || !!errors.email || !!errors.phone || !!errors.password || !!errors.passwordConfirm}>가입하기</button>
      </form>
      <div className="flex flex-col text-lg justify-center items-center gap-[8px]">
        <div>SNS 계정으로 간편 가입하기</div>
        <div className="flex justify-center items-center gap-[8px]">
          <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/google"}><Image src={ic_google_sm} alt="google" width={40} height={40} /></Link>
          <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/kakao"}><Image src={ic_kakao_sm} alt="kakao" width={40} height={40} /></Link>
          <Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/naver"}><Image src={ic_naver_sm} alt="naver" width={40} height={40} /></Link>
        </div>
      </div>
      <div className="text-lg">
        이미 핏메이트 회원이신가요? <Link href="/login" className="text-blue-600">로그인</Link>
      </div>
      <PopUp error={error} setError={setError} />
    </main>
  );
}

export default SignUp;
