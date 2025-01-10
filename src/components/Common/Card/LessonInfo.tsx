import { clsx } from "clsx";
import { VerticalLine } from "../Line";

const lesson_detail = clsx(
  "flex",
  "pc:gap-[1.6rem] tablet:gap-[1.4rem] mobile:gap-[1.4rem]",
  "pc:items-center tablet:items-start mobile:items-start",
  "pc:flex-row tablet:flex-col mobile:flex-col",
);
const info_text = "font-medium pc:text-2lg tablet:text-md mobile:text-md";

interface LessonInfoProps {
  startDate: string;
  endDate: string;
  locationType: string;
}

export default function LessonInfo({ startDate, endDate, locationType }: LessonInfoProps) {
  return (
    <div className={lesson_detail}>
      <p className={info_text}>레슨 시작일: {startDate}</p>
      <div className="pc:block tablet:hidden mobile:hidden">
        <VerticalLine height="1.5rem" />
      </div>
      <div className="flex items-center pc:gap-[1.6rem] tablet:gap-[1.4rem] mobile:gap-[1.4rem]">
        <p className={info_text}>레슨 종료일: {endDate}</p>
        <VerticalLine height="1.5rem" />
        <p className={info_text}>레슨 장소: {locationType}</p>
      </div>
    </div>
  );
}
