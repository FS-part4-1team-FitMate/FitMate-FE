import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props {
  type?: "submit" | "reset" | "button";
  className: string;
  onClick?: () => void;
  children: ReactNode;
}

function Button({ type, className, onClick, children }: Props) {
  return (
    <button
      type={type}
      className={`flex justify-center items-center text-lg p-[8px] rounded-2xl ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
