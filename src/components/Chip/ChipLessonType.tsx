import Image from "next/image";
import { LessonType, lessonType_trans } from "@/types/types";

export default function ChipLessonType({ lessonType }: { lessonType: LessonType }) {
  return (
    <div
      className={`inline-flex items-center gap-[4px] w-fit py-[2px] px-[6px] rounded-lg text-blue-500 text-sm bg-blue-100 shadow-chip pc:text-lg`}
    >
      <Image src={lessonType_trans[lessonType]?.img} width={20} height={20} alt="레슨 타입" />
      {lessonType_trans[lessonType]?.ko}
    </div>
  );
}
