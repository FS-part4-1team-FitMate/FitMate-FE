const content_wrap = "flex items-center gap-[3.2rem]";
const label = "text-gray-300 text-2lg font-normal w-36";
const content = "text-2lg font-normal";

/**
 *
 * @TODO data props로 받아와서 연결해야함
 */

export default function QuoteInfo() {
  return (
    <div className="flex flex-col gap-16">
      <p className="text-2xl font-semibold">견적 정보</p>
      <div className="flex flex-col gap-[1.6rem] py-[3.2rem] px-16 border border-line-100 rounded-[1.6rem] bg-bg-100">
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
