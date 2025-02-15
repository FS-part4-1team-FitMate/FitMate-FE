import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getDetailRequest } from "@/lib/api/requestService";
import { HorizontalLine } from "@/components/Common/Line";
import LessonInfo from "@/components/Common/LessonInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import { LessonSubType, LessonType, LocationType } from "@/types/types";
import { useState, useEffect } from "react";
import QuoteSummaryCard from "@/components/Cards/QuoteSummary";

export default function DetailRequest() {
  const router = useRouter();
  const [lessonRequestId, setLessonRequestId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Router Query:", router.query);
    console.log("Router isReady:", router.isReady);
  
    if (router.isReady) {
      console.log("Router Query Keys:", Object.keys(router.query));
      setLessonRequestId(router.query.id as string);
      console.log("Updated lessonRequestId:", router.query.id);
    }
  }, [router.isReady, router.query]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quote-info", lessonRequestId],
    queryFn: () => {
      console.log("API 요청 실행됨:", lessonRequestId);
      return getDetailRequest(lessonRequestId as string);
    },
    enabled: !!lessonRequestId,
  });


  if (!lessonRequestId) return <p className="text-center">견적 정보를 불러오는 중...</p>;
  if (isLoading) return <p className="text-center">로딩 중...</p>;
  if (isError || !data || !data.list || data.list.length === 0) {
    return <p className="text-center text-red-500">견적 상세 정보를 가져오지 못했습니다.</p>;
  }

  return (
    <div className="flex justify-between max-w-[144rem] m-auto mt-[5.6rem] px-6">
      <div className="flex flex-col gap-16 w-3/4">
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">견적 상세</h1>
          {data ? <QuoteSummaryCard item={data.list[0].lessonRequest} /> : <p>견적 정보를 찾을 수 없습니다.</p>}
        </div>

        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">견적가</h1>
          <p className="text-2lg font-normal">{data.list[0].price.toLocaleString()} 원</p>
        </div>
        <HorizontalLine width="100%" />
        <div>
        {data.list.length > 0 ? (
          <LessonInfo
            lesson={{
              id: data.list[0].lessonRequest.id,
              userId: data.list[0].lessonRequest.userId,
              lessonType: data.list[0].lessonRequest.lessonType as LessonType,
              lessonSubType: data.list[0].lessonRequest.lessonSubType as LessonSubType,
              startDate: data.list[0].lessonRequest.startDate,
              endDate: data.list[0].lessonRequest.endDate,
              lessonCount: data.list[0].lessonRequest.lessonCount,
              lessonTime: data.list[0].lessonRequest.lessonTime,
              locationType: data.list[0].lessonRequest.locationType as LocationType,
              roadAddress: data.list[0].lessonRequest.roadAddress,
              createdAt: data.list[0].lessonRequest.createdAt,
            }}
          />
        ) : (
          <p className="text-center text-gray-500">견적 정보가 없습니다.</p>
        )}
        </div>
      </div>
      <div className="flex flex-col gap-16 w-1/4">
        <ShareSNS label="견적서 공유하기" />
      </div>
    </div>
  );
}