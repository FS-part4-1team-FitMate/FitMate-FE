import { ChangeEvent } from "react";
import { Lesson } from "@/types/lesson";
import { LessonType, RequestType } from "@/types/types";
import UserCard from "../Cards/UserCard";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";

interface RejectedRequestProps {
  item: Lesson;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function RejectedRequest({ item, value, setValue }: RejectedRequestProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8 pc:gap-[3.2rem]">
      <div className="flex flex-col gap-[1.4rem] pc:gap-[2.4rem]">
        <div className="flex gap-[1.2rem]">
          <ChipLessonType lessonType={item.lessonType as LessonType} size="lg" />
          {item.isDirectQuote && <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />}
        </div>
        <UserCard item={item} />
      </div>
      <div className="flex flex-col gap-[1.6rem]">
        <label className="font-semibold text-lg pc:text-xl">반려 사유를 입력해 주세요</label>
        <textarea
          id="rejectionReason"
          value={value}
          onChange={handleChange}
          className="pc:w-[56rem] w-full h-[16rem] p-[1.4rem] rounded-[1.6rem] text-lg font-normal bg-bg-200 pc:text-xl focus:outline-none"
          placeholder="최소 10자 이상 입력해주세요"
        />
      </div>
    </div>
  );
}
