import clsx from "clsx";
import { useState } from "react";
import { pastLessonFilter } from "@/types/dropdown";
import { MyLesson } from "@/types/lesson";
import QuoteInfo from "../Common/QuoteInfo";
import Dropdown from "../Dropdown/Dropdown";
import QuoteCard from "./QuoteCard";

export default function PastLessonCard({ myLesson }: { myLesson: MyLesson }) {
  const [filterValue, setFilterValue] = useState<string>("");

  // 필터 처리 함수
  const handleFilterChange = (filterType: string, value: string) => {
    if (value === "ALL") {
      value = "";
    }
    if (filterType === "pastLesson") {
      setFilterValue(value);
    }
  };

  // 필터링된 리스트
  const filteredQuotes = myLesson.lessonQuotes.filter((quote) => {
    if (!filterValue) return true;
    return quote.status === filterValue;
  });

  return (
    <div
      className={clsx(
        "flex flex-col gap-[3.2rem] w-full mx-auto py-[1.6rem] border border-line-100 shadow-card bg-gray-50",
        "pc:gap-[4.8rem] pc:max-w-[140rem] pc:py-[4.8rem] pc:px-16 pc:rounded-[4rem]",
        "tablet:max-w-[60rem] tablet:px-[3.2rem] tablet:rounded-[2.4rem]",
        "mobile:max-w-[37.5rem] mobile:px-[2.4rem] mobile:rounded-0",
      )}
    >
      <QuoteInfo lessonRequestId={myLesson.id} />
      <div className="flex flex-col gap-[2.4rem] pc:gap-16">
        <p className="text-lg font-semibold pc:text-2xl">견적서 목록</p>
        <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
          <Dropdown
            options={pastLessonFilter}
            type="filter"
            filterType="pastLesson"
            onFilterChange={handleFilterChange}
            currentValue={filterValue}
          />
          {filteredQuotes.map((quote) => (
            <QuoteCard key={quote.id} myLesson={myLesson} quote={quote} />
          ))}
        </div>
      </div>
    </div>
  );
}
