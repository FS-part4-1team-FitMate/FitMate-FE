import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useGetLesson } from "@/lib/api/queries/lesson";
import { useGetQuote, useQuoteAccept } from "@/lib/api/queries/quote";
import { useGetTrainer } from "@/lib/api/queries/trainer";
import formatPrice from "@/lib/utils/formatPrice";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Button from "@/components/Common/Button";
import { HorizontalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

export default function DetailPendingRequest() {
  const router = useRouter();
  const { quoteId } = router.query;

  const {
    data: quoteInfo,
    isLoading: isQuoteLoading,
    isError: isQuoteError,
  } = useGetQuote(quoteId as string);

  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useGetTrainer(quoteInfo?.trainerId as string);

  const {
    data: lesson,
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useGetLesson(quoteInfo?.lessonRequestId as string);

  const quoteAccept = useQuoteAccept();
  const handleAccept = () => {
    if (quoteInfo && quoteInfo.id) {
      quoteAccept.mutate(quoteInfo.id);
    }
  };

  if (isQuoteLoading || isTrainerLoading || isLessonLoading) return <Loading />;

  if (isQuoteError || !quoteInfo)
    return toast.error("견적 정보를 불러오는 중 에러가 발생했어요! 😢");
  if (isTrainerError || !trainer)
    return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");
  if (isLessonError || !lesson) return toast.error("레슨 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile ?? {};
  const lessonData = lesson ?? {};

  return (
    <div className="flex flex-col gap-[1.6rem] pc:gap-[2.4rem]">
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:justify-between pc:max-w-[140rem]">
        <div className="flex flex-col gap-[2.4rem] w-full pc:max-w-[95.5rem] pc:pr-16 pc:gap-16">
          <FindTrainerCard profile={trainerInfo} request={lessonData?.isDirectQuote} />
          <div className="flex flex-col gap-4 pc:hidden">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" trainerInfo={trainerInfo} />
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
            <p className="text-lg font-semibold pc:text-2xl">견적가</p>
            <p className="text-xl font-bold pc:text-3xl">{formatPrice(quoteInfo?.price)}원</p>
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-16">
            <QuoteInfo lesson={lessonData} />
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-row gap-[0.8rem] p-4">
            <Button
              onClick={handleAccept}
              className={
                "h-[6.4rem] p-4 rounded-[1.6rem] font-semibold w-full text-gray-50 bg-blue-300 pc:text-xl pc:w-[32.8rem]"
              }
            >
              {quoteAccept.isLoading ? "견적 확정 중 ..." : "견적 확정하기"}
            </Button>
          </div>
          <div className="hidden pc:flex pc:flex-col pc:gap-16">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" trainerInfo={trainerInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
