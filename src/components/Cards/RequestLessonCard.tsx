import CardContainer from "../Common/Card/CardContainer";
import { HorizontalLine, VerticalLine } from "../Common/Card/Line";

export default function RequestLessonCard() {
  return (
    <CardContainer width="95.5rem" gap="2.4rem">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">칩 넣을 자리</p>
        <p className="text-gray-500 text-xs font-normal">1시간 전</p>
      </div>
      <p className="text-xl font-semibold">김고객 고객님</p>
      <HorizontalLine />
      <div className="flex items-center gap-[1.6rem]">
        <p className="text-2lg font-medium">레슨 시작일: 2025.02.02</p>
        <VerticalLine height="1.6rem" />
        <p className="text-2lg font-medium">레슨 종료일: 2025.02.15</p>
        <VerticalLine height="1.6rem" />
        <p className="text-2lg font-medium">레슨 장소: 온라인</p>
      </div>
      <div className="flex justify-end items-center gap-[1.6rem]">
        <p className="text-2lg font-medium">견적 금액</p>
        <p className="text-2xl font-bold">180,000원</p>
      </div>
      <div className="flex gap-[1.1rem]">
        <button className="flex-1 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-blue-300">
          견적 보내기
        </button>
        <button className="flex-1 h-[6.4rem] p-[1.6rem] border border-blue-300 rounded-[1.6rem] text-blue-300 text-xl font-semibold bg-gray-50">
          반려
        </button>
      </div>
    </CardContainer>
  );
}
