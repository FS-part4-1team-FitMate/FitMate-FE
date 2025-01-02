import { postLogin } from "@/lib/api/authService";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EMAIL_REGEX = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

function LogIn() {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    }
  });

	useEffect(() => {
		console.log(errors);
	}, [errors]);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const userData = await postLogin(data);
    } catch (err) {

    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[32px] h-screen w-[384px] max-w-full mx-auto p-[4px]">
      <Image src="/assets/img/logo_xl.svg" alt="Logo" width={384} height={124} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px] items-stretch w-full">
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
              required: '암호를 입력해 주세요.',
              minLength: {
                value: 8,
                message: '암호는 최소 8글자 이상이어야 합니다.',
              },
            })}
            type={pwdIsVisible ? "text" : "password"}
            id="password"
            placeholder="비밀번호"
          />
					<Image className="absolute right-[8px] top-[8px] bottom-[8px]" width={24} height={24} src={pwdIsVisible ? "/assets/ic/ic_visibility_on.svg" : "/assets/ic/ic_visibility_off.svg"} alt="eye" onClick={() => setPwdIsVisible(!pwdIsVisible)} />
        </div>
        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        <button className="w-full h-[40px] text-lg rounded-2xl text-white bg-blue-600" type="submit">로그인</button>
      </form>
			<div className="flex flex-col text-lg justify-center items-center gap-[8px]">
				<div>SNS 계정으로 로그인</div>
				<div className="flex justify-center items-center gap-[8px]">
					<Image src="/assets/ic/ic_google_sm.svg" alt="google" width={40} height={40} />
					<Image src="/assets/ic/ic_kakao_sm.svg" alt="kakao" width={40} height={40} />
					<Image src="/assets/ic/ic_naver_sm.svg" alt="naver" width={40} height={40} />
				</div>
			</div>
			<div>
				아직 핏메이트 회원이 아니신가요? <a href="/signup" className="text-blue-600">일반 회원가입</a>, <a href="/signup" className="text-blue-600">트레이너 회원가입</a>
			</div>
    </div>
  );
}

export default LogIn;
