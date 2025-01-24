import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getTrainerInfo } from "@/lib/api/trainerService";
import { pastLessonFilter } from "@/types/dropdown";
import { Quote } from "@/types/quote";
import Loading from "../Common/Loading";
import QuoteInfo from "../Common/QuoteInfo";
import Dropdown from "../Dropdown/Dropdown";
import QuoteCard from "./QuoteCard";

export default function PastLessonCard({
  setStatus,
  quote,
}: {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  quote: Quote;
}) {
  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery(["trainer-info"], () => getTrainerInfo(quote.trainerId));

  if (isError) return <div>error!</div>;

  const trainerInfo = trainer?.profile ?? [];

  // 필터 처리 함수
  const handleFilterChange = (filterType: string, value: string) => {
    if (value === "ALL") {
      value = "";
    }

    if (filterType === "pastLesson") {
      setStatus(value);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-[3.2rem] w-full mx-auto py-[1.6rem] border border-line-100 shadow-card bg-gray-50",
        "pc:gap-[4.8rem] pc:max-w-[140rem] pc:py-[4.8rem] pc:px-16 pc:rounded-[4rem]",
        "tablet:max-w-[60rem] tablet:px-[3.2rem] tablet:rounded-[2.4rem]",
        "mobile:max-w-[37.5rem] mobile:px-[2.4rem] mobile:rounded-0",
      )}
    >
      <QuoteInfo lessonRequestId={quote.lessonRequestId} />
      <div className="flex flex-col gap-[2.4rem] pc:gap-16">
        <p className="text-lg font-semibold pc:text-2xl">견적서 목록</p>
        <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
          <Dropdown
            options={pastLessonFilter}
            type="filter"
            filterType="pastLesson"
            onFilterChange={handleFilterChange}
          />
          <QuoteCard lessonRequestId={quote.lessonRequestId} quote={quote} trainer={trainerInfo} />
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
