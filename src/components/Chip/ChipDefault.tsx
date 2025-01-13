import clsx from "clsx";
import { LessonType, lessonType_trans } from "@/types/types";

interface Props {
  lessonType: LessonType;
  size: "sm" | "md";
}

export default function ChipDefault({ lessonType, size }: Props) {
  const chip = clsx(
    "flex justify-center items-center w-fit",
    "border border-blue-300 rounded-[10rem]",
    "text-blue-300 font-medium shadow-chip bg-blue-50",
    size === "md" ? "py-4 px-8 text-2xl" : "py-[0.6rem] px-[1.2rem] text-md",
  );

  return (
    <div className={chip}>
      <p>{lessonType_trans[lessonType].ko}</p>
    </div>
  );
}
