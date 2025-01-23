import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuoteList } from "@/lib/api/quoteService";
import { Quote, QuoteParams, QuoteResult } from "@/types/quote";
import PendingLessonCard from "@/components/Cards/PendingLessonCard";
import Loading from "@/components/Common/Loading";

export default function PendingRequest() {
  const [params, setParams] = useState<QuoteParams>({
    page: 1,
    limit: 5,
    order: "created_at",
    sort: "asc",
    status: "PENDING",
  });

  const { data, isLoading, isError } = useQuery<QuoteResult>(["pending-list", params], () =>
    getQuoteList(params),
  );

  if (isError) return <div>error!</div>;

  const quoteList = data?.list || [];

  return (
    <div className="flex flex-col gap-[2.4rem] mx-auto mt-16 px-8 pc:grid pc:grid-cols-2 pc:gap-x-[2.4rem] pc:gap-y-[4.8rem] pc:max-w-[140rem] tablet:max-w-[64rem] mobile:max-w-[36.7rem]">
      {quoteList?.map((item: Quote, index: number) => (
        <PendingLessonCard key={index} item={item} />
      ))}
      {isLoading && <Loading />}
    </div>
  );
}
