import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props {
  type?: "submit" | "reset" | "button";
  className: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

function Button({ type, className, onClick, disabled, children }: Props) {
  return (
    <button
      type={type}
      className={`flex justify-center items-center text-lg p-[8px] rounded-2xl ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
