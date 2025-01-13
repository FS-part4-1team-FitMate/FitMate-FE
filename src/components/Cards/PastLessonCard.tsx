import clsx from "clsx";
import { PastLessonFilter } from "@/types/dropdown";
import QuoteInfo from "../Common/QuoteInfo";
import Dropdown from "../Dropdown/Dropdown";
import QuoteCard from "./QuoteCard";

const container = clsx(
  "flex flex-col gap-[3.2rem] w-full mx-auto py-[1.6rem] border border-line-100 shadow-card bg-gray-50",
  "pc:gap-[4.8rem] pc:max-w-[140rem] pc:py-[4.8rem] pc:px-16 pc:rounded-[4rem]",
  "tablet:max-w-[60rem] tablet:px-[3.2rem] tablet:rounded-[2.4rem]",
  "mobile:max-w-[37.5rem] mobile:px-[2.4rem] mobile:rounded-0",
);

export default function PastLessonCard({ trainerInfos }: { trainerInfos: any[] }) {
  const pastLessonFilter: PastLessonFilter[] = ["전체", "확정한 견적서"];

  return (
    <div className={container}>
      <QuoteInfo />
      <div className="flex flex-col gap-[2.4rem] pc:gap-16">
        <p className="text-lg font-semibold pc:text-2xl">견적서 목록</p>
        <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
          <Dropdown options={pastLessonFilter} type="pastLesson" />
          {trainerInfos.map((item, index) => (
            <QuoteCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
