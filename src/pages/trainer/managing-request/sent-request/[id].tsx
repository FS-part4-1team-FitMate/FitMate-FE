import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDetailRequest } from "@/lib/api/requestService";
import SentRequestCard from "@/components/Cards/SentRequestCard";
import { HorizontalLine } from "@/components/Common/Line";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";

export default function DetailRequest() {
  const router = useRouter();
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Router Query:", router.query); // router.query가 어떤 값을 가지고 있는지 확인
    console.log("Router isReady:", router.isReady); // router.isReady가 언제 true가 되는지 확인

    if (router.isReady) {
      console.log("Router Query Keys:", Object.keys(router.query)); // query에 어떤 키들이 있는지 확인
      setLessonRequestId(router.query.id as string);
      console.log("Updated lessonRequestId:", router.query.id);
    }
  }, [router.query]);

  console.log("✅ 현재 요청된 requestId:", requestId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quote-info", lessonRequestId],
    queryFn: () => {
      console.log("API 요청 실행됨:", lessonRequestId);
      return getDetailRequest(lessonRequestId as string);
    },
    enabled: !!lessonRequestId, // lessonRequestId가 있을 때만 실행
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
