import { useQuery } from "@tanstack/react-query";
import { getQuote } from "@/lib/api/quoteService";
import SentRequestCard from "@/components/Cards/SentRequestCard";
import { HorizontalLine } from "@/components/Common/Line";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";

export default function Detailrequest({ requestId }: { requestId: string | null }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quote-info", requestId],
    queryFn: () => getQuote(requestId as string),
    enabled: !!requestId,
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError || !data) return <div>견적 상세 정보를 가져오지 못했습니다.</div>;

  return (
    <div className="flex justify-between max-w-[144rem] m-auto mt-[5.6rem]">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">견적 상세</h1>
          <SentRequestCard item={data} />
        </div>
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">견적가</h1>
          <p className="text-2lg font-normal">{data.price.toLocaleString()} 원</p>
        </div>
        <HorizontalLine width="100%" />
        <div>
          <QuoteInfo lesson={data} />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <ShareSNS label="견적서 공유하기" />
      </div>
    </div>
  );
}
