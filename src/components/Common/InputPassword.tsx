import { ic_visibility_off, ic_visibility_on } from "@/imageExports";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  className?: string;
  register?: UseFormRegisterReturn;
  placeholder: string;
  pwdIsVisible: boolean;
  setPwdIsVisible: Dispatch<SetStateAction<boolean>>;
}

function InputPassword({
  id,
  label,
  className,
  register,
  placeholder,
  pwdIsVisible,
  setPwdIsVisible,
}: Props) {
  return (
    <div className={`flex flex-col w-full gap-[12px]`}>
      <label className="w-full text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
      <div className={`relative w-full h-[40px] text-slate-700 ${className}`}>
        <input
          className="w-full h-full text-lg p-[8px] border border-gray-300 rounded-2xl"
          {...register}
          type={pwdIsVisible ? "text" : "password"}
          id={id}
          placeholder={placeholder}
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
    </div>
  );
}

export default InputPassword;
