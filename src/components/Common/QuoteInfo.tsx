import clsx from "clsx";
import formatDate from "@/lib/utils/formatDate";
import formatDateTime from "@/lib/utils/formatDateTime";
import { Lesson } from "@/types/lesson";
import {
  LocationType,
  lessonSubType_trans,
  lessonType_trans,
  locationType_trans,
} from "@/types/types";

const content_area = clsx(
  "flex flex-col gap-[1.6rem]",
  "border border-line-100 rounded-[1.6rem] bg-bg-100",
  "pc:py-[3.2rem] tablet:py-[2.4rem] mobile:py-[1.6rem]",
  "pc:px-16 tablet:px-[3.2rem] mobile:px-8",
);

export default function QuoteInfo({ lesson }: { lesson: Lesson }) {
  const getLocation = () => {
    if (lesson?.locationType === LocationType.OFFLINE) {
      return lesson.roadAddress;
    } else {
      return locationType_trans[lesson?.locationType];
    }
  };

  const quoteInfo = [
    { label: "견적 요청일", content: formatDate(lesson?.createdAt) },
    {
      label: "서비스",
      content: `${lessonType_trans[lesson?.lessonType]?.ko} > ${lessonSubType_trans[lesson?.lessonSubType]}`,
    },
    { label: "레슨 시작일", content: formatDateTime(lesson?.startDate) },
    { label: "레슨 종료일", content: formatDateTime(lesson?.endDate) },
    { label: "레슨 횟수", content: lesson?.lessonCount },
    { label: "레슨 시간", content: lesson?.lessonTime },
    { label: "레슨 장소", content: getLocation() },
  ];

  return (
    <div className="flex flex-col gap-[2.4rem] pc:gap-16">
      <p className="font-semibold text-lg pc:text-2xl">견적 정보</p>
      <div className={content_area}>
        {quoteInfo.map((info) => (
          <div className="flex items-start gap-[3.2rem]">
            <p className="w-28 text-gray-300 text-md font-normal pc:w-36 pc:text-2lg">
              {info.label}
            </p>
            <p className="text-md font-normal pc:text-2lg">{info.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
