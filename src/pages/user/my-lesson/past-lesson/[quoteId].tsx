import { ic_info_md } from "@/imageExports";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useGetLesson } from "@/lib/api/queries/lesson";
import { useGetQuote } from "@/lib/api/queries/quote";
import { useGetTrainer } from "@/lib/api/queries/trainer";
import formatPrice from "@/lib/utils/formatPrice";
import { LessonRequestStatus } from "@/types/types";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

export default function DetailPastRequest() {
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

  if (isQuoteLoading || isTrainerLoading || isLessonLoading) return <Loading />;

  if (isQuoteError || !quoteInfo)
    return toast.error("견적 정보를 불러오는 중 에러가 발생했어요! 😢");
  if (isTrainerError || !trainer)
    return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");
  if (isLessonError || !lesson) return toast.error("레슨 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile ?? {};
  const lessonData = lesson ?? {};

  return (
    <div className="flex flex-col gap-[1.6rem] mx-auto pb-16 pc:gap-[2.4rem] pc:max-w-[140rem]">
      <Head>
        <title>견적 상세 정보 | 핏메이트</title>
      </Head>
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:justify-between">
        <div className="flex flex-col gap-[2.4rem] w-full pc:pr-16 pc:gap-16">
          <FindTrainerCard profile={trainerInfo} status={quoteInfo.status} />
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
            {quoteInfo.status !== LessonRequestStatus.ACCEPTED && (
              <div className="flex items-center gap-[1.6rem] py-[2.4rem] px-[3.2rem] border border-blue-200 rounded-[1.2rem] bg-blue-100">
                <Image src={ic_info_md} width={24} height={24} alt="느낌표" />
                <p className="text-blue-300 text-lg font-regular">확정하지 않은 견적이에요!</p>
              </div>
            )}
          </div>
        </div>
        <div className="hidden pc:flex flex-col gap-16 max-w-[30rem] w-full">
          <ShareSNS label="견적서 공유하기" trainerInfo={trainerInfo} />
        </div>
      </div>
    </div>
  );
}
