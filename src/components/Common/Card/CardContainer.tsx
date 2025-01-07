import clsx from "clsx";
import { ReactNode } from "react";

const card_container = clsx(
  "flex flex-col",
  "py-[2rem] px-[2.4rem] rounded-[1.6rem]",
  "shadow-card bg-gray-50",
);

interface CardContainerProps {
  width: string;
  gap: string;
  children: ReactNode;
}

export default function CardContainer({ width, gap, children }: CardContainerProps) {
  return (
    <div className={`${card_container} gap-[${gap}]`} style={{ width: width }}>
      {children}
    </div>
  );
}
