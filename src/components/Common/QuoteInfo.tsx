import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getLessonInfo } from "@/lib/api/lessonService";
import formatDate from "@/lib/utils/formatDate";
import { Lesson } from "@/types/lesson";

const content_area = clsx(
  "flex flex-col gap-[1.6rem]",
  "border border-line-100 rounded-[1.6rem] bg-bg-100",
  "pc:py-[3.2rem] tablet:py-[2.4rem] mobile:py-[1.6rem]",
  "pc:px-16 tablet:px-[3.2rem] mobile:px-8",
);
const content_wrap = "flex items-center gap-[3.2rem]";
const label = "w-36 text-gray-300 text-md font-normal pc:text-2lg";
const content = "text-md font-normal pc:text-2lg";

export default function QuoteInfo({ lessonRequestId }: { lessonRequestId: string }) {
  const { data, isLoading, isError } = useQuery<Lesson>({
    queryKey: ["trainer-info", lessonRequestId],
    queryFn: () => getLessonInfo(lessonRequestId),
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>견정 확정에 실패하였습니다.</div>;

  return (
    <div className="flex flex-col gap-[2.4rem] pc:gap-16">
      <p className="font-semibold text-lg pc:text-2xl">견적 정보</p>
      <div className={content_area}>
        <div className={content_wrap}>
          <p className={label}>견적 요청일</p>
          <p className={content}>{formatDate(data.createdAt)}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>서비스 </p>
          <p className={content}>{data.lessonType}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 시작일</p>
          <p className={content}>{data.startDate}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 종료일</p>
          <p className={content}>{data.endDate}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 장소 </p>
          <p className={content}>{data.locationType}</p>
        </div>
      </div>
    </div>
  );
}
