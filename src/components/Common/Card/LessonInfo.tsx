import { clsx } from "clsx";
import { VerticalLine } from "../Line";

const lesson_detail = clsx(
  "flex",
  "pc:gap-[1.6rem] tablet:gap-[1.4rem] mobile:gap-[1.4rem]",
  "pc:items-center tablet:items-start mobile:items-start",
  "pc:flex-row tablet:flex-col mobile:flex-col",
);
const info_text = "flex items-center gap-[0.8rem] text-md font-medium pc:gap-[1.6rem] pc:text-2lg";

interface LessonInfoProps {
  startDate: string;
  endDate: string;
  locationType: string;
}

export default function LessonInfo({ startDate, endDate, locationType }: LessonInfoProps) {
  return (
    <div className={lesson_detail}>
      <div className={info_text}>
        <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
          <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 시작일</p>
        </div>
        <p>{startDate}</p>
      </div>
      <div className="pc:block tablet:hidden mobile:hidden">
        <VerticalLine height="1.5rem" />
      </div>
      <div className="flex items-center pc:gap-[1.6rem] tablet:gap-[1.4rem] mobile:gap-[1.4rem]">
        <div className={info_text}>
          <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
            <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 종료일</p>
          </div>
          <p>{endDate}</p>
        </div>
        <VerticalLine height="1.5rem" />
        <div className={info_text}>
          <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
            <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 장소</p>
          </div>
          <p>{locationType}</p>
        </div>
      </div>
    </div>
  );
}
