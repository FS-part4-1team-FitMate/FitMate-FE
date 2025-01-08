import { VerticalLine } from "../Line";

const lesson_detail = "flex items-center gap-[1.6rem]";
const info_text = "text-2lg font-medium";

interface LessonInfoProps {
  startDate: string;
  endDate: string;
  locationType: string;
}

export default function LessonInfo({ startDate, endDate, locationType }: LessonInfoProps) {
  return (
    <div className={lesson_detail}>
      <p className={info_text}>레슨 시작일: {startDate}</p>
      <VerticalLine height="1.6rem" />
      <p className={info_text}>레슨 종료일: {endDate}</p>
      <VerticalLine height="1.6rem" />
      <p className={info_text}>레슨 장소: {locationType}</p>
    </div>
  );
}
