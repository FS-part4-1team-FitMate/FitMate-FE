import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  className?: string;
  register?: UseFormRegisterReturn;
  placeholder: string;
}

function Textarea({ id, label, className, register, placeholder }: Props) {
  return (
    <div className={`flex flex-col w-full gap-[12px]`}>
      <label className="w-full text-lg font-semibold" htmlFor={id}>
        {label}
      </label>
      <textarea
        className={`text-md font-regular w-full rounded-xl p-[5px] border-[1px] border-solid border-gray-300 h-[160px] overflow-y-auto ${className}`}
        {...register}
        id={id}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}

export default Textarea;
