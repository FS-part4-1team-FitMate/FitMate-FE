import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuoteList } from "@/lib/api/quoteService";
import { QuoteParams, QuoteResult } from "@/types/quote";
import PastLessonCard from "@/components/Cards/PastLessonCard";
import Loading from "@/components/Common/Loading";
import Pagination from "@/components/Common/Pagination";

export default function PastLesson() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [params, setParams] = useState<QuoteParams>({
    page: currentPage,
    limit: 1,
    order: "created_at",
    sort: "asc",
  });

  const { data, isLoading, isError } = useQuery<QuoteResult>(["pending-list", params], () =>
    getQuoteList(params),
  );

  if (isError) return <div>error!</div>;

  const quoteList = data?.list || [];
  const totalPages = data?.totalCount || 0;

  return (
    <div className="flex flex-col gap-16 max-w-[192rem] m-auto py-16 bg-bg-100 pc:py-[6.4rem]">
      {quoteList.map((item) => (
        <PastLessonCard quote={item} />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      {isLoading && <Loading />}
    </div>
  );
}
