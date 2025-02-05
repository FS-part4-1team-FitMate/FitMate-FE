import clsx from "clsx";
import formatDate from "@/lib/utils/formatDate";
import formatDateTime from "@/lib/utils/formatDateTime";
import { Lesson, MyLesson } from "@/types/lesson";
import { LessonType, LocationType, lessonType_trans, locationType_trans } from "@/types/types";

const content_area = clsx(
  "flex flex-col gap-[1.6rem]",
  "border border-line-100 rounded-[1.6rem] bg-bg-100",
  "pc:py-[3.2rem] tablet:py-[2.4rem] mobile:py-[1.6rem]",
  "pc:px-16 tablet:px-[3.2rem] mobile:px-8",
);
const content_wrap = "flex items-center gap-[3.2rem]";
const label = "w-36 text-gray-300 text-md font-normal pc:text-2lg";
const content = "text-md font-normal pc:text-2lg";

export default function QuoteInfo({ lesson }: { lesson: MyLesson | Lesson }) {
  const getLocation = () => {
    if (lesson?.locationType === "OFFLINE") {
      return lesson.roadAddress;
    } else {
      return locationType_trans[lesson?.locationType as LocationType];
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem] pc:gap-16">
      <p className="font-semibold text-lg pc:text-2xl">견적 정보</p>
      <div className={content_area}>
        <div className={content_wrap}>
          <p className={label}>견적 요청일</p>
          <p className={content}>{formatDate(lesson?.createdAt)}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>서비스 </p>
          <p className={content}>{lessonType_trans[lesson?.lessonType as LessonType]?.ko}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 시작일</p>
          <p className={content}>{formatDateTime(lesson?.startDate)}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 종료일</p>
          <p className={content}>{formatDateTime(lesson?.endDate)}</p>
        </div>
        <div className={content_wrap}>
          <p className={label}>레슨 장소 </p>
          <p className={content}>{getLocation()}</p>
        </div>
      </div>
    </div>
  );
}
