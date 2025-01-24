import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuoteList } from "@/lib/api/quoteService";
import { QuoteParams, QuoteResult } from "@/types/quote";
import PastLessonCard from "@/components/Cards/PastLessonCard";
import Loading from "@/components/Common/Loading";
import Pagination from "@/components/Common/Pagination";

export default function PastLesson() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("ACCEPTED");
  const [params, setParams] = useState<QuoteParams>({
    page: currentPage,
    limit: 1,
    order: "created_at",
    sort: "asc",
    status,
  });

  const { data, isLoading, isError } = useQuery<QuoteResult>(["past-lesson", params], () =>
    getQuoteList(params),
  );

  if (isError) return <div>error!</div>;

  const quoteList = data?.list || [];
  const totalPages = data?.list.length || 0;

  console.log(params.status);

  return (
    <div className="flex flex-col gap-16 max-w-[192rem] m-auto py-16 bg-bg-100 pc:py-[6.4rem] pc:px-16 tablet:px-16 mobile:px-0">
      {quoteList.map((item) => (
        <PastLessonCard setStatus={setStatus} quote={item} />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      {isLoading && <Loading />}
    </div>
  );
}
