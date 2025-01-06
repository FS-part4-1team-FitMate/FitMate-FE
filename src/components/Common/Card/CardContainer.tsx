import clsx from "clsx";
import { ReactNode } from "react";

const card_container = clsx(
  "flex flex-col",
  "w-[95.5rem] h-[23rem]",
  "py-[2rem] px-[2.4rem] rounded-[1.6rem]",
  "bg-gray-50",
);

interface CardContainerProps {
  gap: string;
  children: ReactNode;
}

export default function CardContainer({ gap, children }: CardContainerProps) {
  return <div className={`${card_container} gap-[${gap}]`}>{children}</div>;
}
