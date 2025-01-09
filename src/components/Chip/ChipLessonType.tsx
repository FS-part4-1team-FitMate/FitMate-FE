import Image from "next/image";
import { LessonType, lessonType_trans } from "@/types/types";

interface Props {
  lessonType: LessonType;
  size: "sm" | "lg" | "xl";
}

function ChipLessonType({ lessonType, size }: Props) {
  return (
    <div
      className={`inline-flex justify-center items-center text-${size} rounded-lg text-blue-500 bg-blue-100 gap-[2px] py-[4px] px-[3px]`}
    >
      <Image src={lessonType_trans[lessonType].img} width={24} height={24} alt="레슨 타입" />
      {size !== "sm" && lessonType_trans[lessonType].ko}
    </div>
  );
}

export default ChipLessonType;
