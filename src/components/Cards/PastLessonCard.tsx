import clsx from "clsx";
import { PastLessonFilter } from "@/types/dropdown";
import QuoteInfo from "../Common/QuoteInfo";
import Dropdown from "../Dropdown/Dropdown";
import QuoteCard from "./QuoteCard";

const container = clsx(
  "flex flex-col w-full mx-auto border border-line-100 shadow-card bg-gray-50",
  "pc:gap-[4.8rem] pc:max-w-[140rem] pc:py-[4.8rem] pc:px-16 pc:rounded-[4rem]",
  "tablet:gap-[3.2rem] tablet:max-w-[60rem] tablet:py-[1.6rem] tablet:px-[3.2rem] tablet:rounded-[2.4rem]",
  "mobile:gap-[3.2rem] mobile:max-w-[37.5rem] mobile:py-[1.6rem] mobile:px-[2.4rem] mobile:rounded-0",
);

export default function PastLessonCard({ trainerInfos }: { trainerInfos: any[] }) {
  const pastLessonFilter: PastLessonFilter[] = ["전체", "확정한 견적서"];

  return (
    <div className={container}>
      <QuoteInfo />
      <div className="flex flex-col pc:gap-16 tablet:gap-[2.4rem] mobile:gap-[2.4rem]">
        <p className="font-semibold pc:text-2xl tablet:text-lg mobile:text-lg">견적서 목록</p>
        <div className="flex flex-col pc:gap-[3.2rem] tablet:gap-[1.6rem] mobile:gap-[1.6rem]">
          <Dropdown options={pastLessonFilter} type="pastLesson" />
          {trainerInfos.map((item, index) => (
            <QuoteCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
