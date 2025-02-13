import clsx from "clsx";
import { LessonType, lessonType_trans } from "@/types/types";

const chip = clsx(
  "flex justify-center items-center w-fit",
  "py-[0.6rem] px-[1.2rem] border border-blue-300 rounded-[10rem]",
  "text-blue-300 text-md font-medium shadow-chip bg-blue-50",
  "pc:py-4 pc:px-8 pc:text-2lg",
);

export default function ChipDefault({ lessonType }: { lessonType: LessonType }) {
  return (
    <div className={chip}>
      <p>{lessonType_trans[lessonType].ko}</p>
    </div>
  );
}
