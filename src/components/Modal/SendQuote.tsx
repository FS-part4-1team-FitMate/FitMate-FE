import clsx from "clsx";
import { Lesson } from "@/types/lesson";
import { LessonType, RequestType } from "@/types/types";
import UserCard from "../Cards/UserCard";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import { HorizontalLine } from "../Common/Line";

const input = clsx(
  "w-full p-[1.4rem] rounded-[1.6rem] text-lg font-normal bg-bg-200",
  "pc:w-[56rem] pc:text-xl focus:outline-none",
);

interface SendQuoteProps {
  item: Lesson;
  setQuote: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function SendQuote({ item, setQuote, setMessage }: SendQuoteProps) {
  return (
    <div className="flex flex-col gap-8 pc:gap-[3.2rem]">
      <div className="flex flex-col gap-[1.4rem] pc:gap-[2.4rem]">
        <div className="flex gap-[1.2rem]">
          <ChipLessonType lessonType={LessonType.FITNESS} size="lg" />
          <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />
        </div>
        <UserCard item={item} />
      </div>
      <HorizontalLine width="100%" />
      <div className="flex flex-col gap-[1.6rem]">
        <label className="text-lg font-semibold pc:text-xl">견적가를 입력해주세요</label>
        <input
          className={`${input} h-[6.4rem]`}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="견적가 입력"
        />
      </div>
      <HorizontalLine width="100%" />
      <div className="flex flex-col gap-[1.6rem]">
        <label className="text-lg font-semibold pc:text-xl">코멘트를 입력해 주세요</label>
        <textarea
          className={`${input} h-[16rem]`}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="최소 10자 이상 입력해주세요"
        />
      </div>
    </div>
  );
}
