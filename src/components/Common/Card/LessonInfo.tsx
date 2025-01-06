import { VerticalLine } from "./Line";

const lesson_detail = "flex items-center gap-[1.6rem]";
const info_text = "text-2lg font-medium";

export default function LessonInfo() {
  return (
    <div className={lesson_detail}>
      <p className={info_text}>레슨 시작일: 2025.02.02</p>
      <VerticalLine height="1.6rem" />
      <p className={info_text}>레슨 종료일: 2025.02.15</p>
      <VerticalLine height="1.6rem" />
      <p className={info_text}>레슨 장소: 온라인</p>
    </div>
  );
}
