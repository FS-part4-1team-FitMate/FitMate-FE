import clsx from "clsx";
import { ReactNode } from "react";

interface CardContainerProps {
  width: string;
  gap?: string;
  children: ReactNode;
  size?: "sm" | "lg";
}

export default function CardContainer({
  width,
  gap = "2.4rem",
  children,
  size = "lg",
}: CardContainerProps) {
  const card_container = clsx(
    "flex flex-col py-[1.6rem] px-[1.4rem] rounded-[1.6rem]",
    "shadow-card bg-gray-50",
    size === "lg" && "pc:py-[2rem] pc:px-[2.4rem]",
  );

  return (
    <div className={`${card_container} gap-[1.4rem] pc:gap-[${gap}]`} style={{ width: width }}>
      {children}
    </div>
  );
}
