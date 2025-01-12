import clsx from "clsx";

const content_area = clsx(
  "flex flex-col gap-[1.6rem]",
  "border border-line-100 rounded-[1.6rem] bg-bg-100",
  "pc:py-[3.2rem] tablet:py-[2.4rem] mobile:py-[1.6rem]",
  "pc:px-16 tablet:px-[3.2rem] mobile:px-8",
);
const content_wrap = "flex items-center gap-[3.2rem]";
const label = "w-36 text-gray-300 text-md font-normal pc:text-2lg";
const content = "text-md font-normal pc:text-2lg";

/**
 *
 * @TODO data props로 받아와서 연결해야함
 */

export default function QuoteInfo() {
  return (
    <div className="flex flex-col gap-[2.4rem] pc:gap-16">
      <p className="font-semibold text-lg pc:text-2xl">견적 정보</p>
      <div className={content_area}>
        <div className={content_wrap}>
          <p className={label}>견적 요청일</p>
          <p className={content}>25.02.02</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>서비스 </p>
          <p className={content}>스포츠</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 시작일</p>
          <p className={content}>25.02.02</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 종료일</p>
          <p className={content}>25.02.12</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 장소 </p>
          <p className={content}>온라인</p>
        </div>
      </div>
    </div>
  );
}
