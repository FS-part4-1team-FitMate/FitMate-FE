import clsx from "clsx";
import { ReactNode } from "react";

const card_container = clsx(
  "flex flex-col",
  "py-[2rem] px-[2.4rem] rounded-[1.6rem]",
  "bg-gray-50",
);

export default function CardContainer({ children }: { children: ReactNode }) {
  return <div className={card_container}>{children}</div>;
}
