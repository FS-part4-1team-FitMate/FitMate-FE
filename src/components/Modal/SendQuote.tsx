import { HorizontalLine, VerticalLine } from "../Common/Line";

export default function SendQuote() {
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <div className="flex flex-col gap-[2.4rem]">
        <div className="text-xl font-semibold">칩 넣을 자리</div>
        <div className="flex flex-col gap-[1.6rem] py-[2.4rem] px-[1.8rem] border border-line-100 rounded-[0.8rem]">
          <p className="text-2xl font-semibold">김고객 고객님</p>
          <div className="flex flex-col gap-[1.4rem]">
            <p className="text-2lg font-medium">레슨 장소: 온라인</p>
            <div className="flex items-center gap-[1.6rem]">
              <p className="text-2lg font-medium">레슨 시작일: 2025.02.01</p>
              <VerticalLine height="1.6rem" />
              <p className="text-2lg font-medium">레슨 종료일: 2025.02.10</p>
            </div>
          </div>
        </div>
      </div>
      {/* 추후 공통 컴포넌트로 교체 (input, textarea) */}
      <div className="flex flex-col gap-[1.6rem]">
        <label className="text-xl font-semibold">견적가를 입력해주세요</label>
        <input className="w-[56rem] h-[6.4rem] p-[1.4rem] rounded-[1.6rem] bg-bg-200" />
      </div>
      <HorizontalLine width="100%" />
      <div className="flex flex-col gap-[1.6rem]">
        <label className="text-xl font-semibold">코멘트를 입력해 주세요</label>
        <textarea className="w-[56rem] h-[16rem] p-[1.4rem] rounded-[1.6rem] bg-bg-200" />
      </div>
    </div>
  );
}
