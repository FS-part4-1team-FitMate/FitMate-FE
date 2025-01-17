import { UseFormRegisterReturn } from "react-hook-form";
import { profile_menu } from "@/types/constants";

interface Props {
  id: string;
  label: string;
  type: string;
  className?: string;
  register?: UseFormRegisterReturn;
  placeholder: string;
}

function Input({ id, label, type, className, register, placeholder }: Props) {
  return (
    <div className={profile_menu}>
      <label className="w-full text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`w-full text-lg p-[8px] h-[40px] text-slate-700 border border-gray-300 rounded-2xl ${className}`}
        {...register}
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
