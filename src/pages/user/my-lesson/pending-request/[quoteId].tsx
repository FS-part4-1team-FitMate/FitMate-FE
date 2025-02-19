import { ic_chat } from "@/imageExports";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { createOrGetChatRoom } from "@/lib/api/chatService";
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

  const handleChatRoom = async () => {
    if (!trainerInfo?.userId) {
      toast.error("강사 정보가 없습니다.");
      return;
    }

    try {
      const roomId = await createOrGetChatRoom(trainerInfo.userId);

      if (roomId) {
        router.push("/chat");
      } else {
        toast.error("채팅방을 생성할 수 없습니다.");
      }
    } catch (error) {
      console.error("🚨 채팅방 생성 실패:", error);
      toast.error("채팅방 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-[1.6rem] mx-auto pb-40 pc:gap-[2.4rem] pc:max-w-[140rem]">
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:justify-between">
        <div className="flex flex-col gap-[2.4rem] w-full pc:pr-16 pc:gap-16">
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
          <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 flex flex-row gap-[0.8rem] max-w-[74.4rem] w-full px-8 pc:relative pc:bottom-auto pc:flex-col pc:gap-8 pc:px-0">
            <Button
              onClick={handleAccept}
              className={
                "hover:bg-blue-600 flex-1 h-[6.4rem] p-4 rounded-[1.6rem] font-semibold text-gray-50 bg-blue-300 pc:text-xl pc:w-[32.8rem] pc:flex-initial"
              }
            >
              {quoteAccept.isLoading ? "견적 확정 중 ..." : "견적 확정하기"}
            </Button>
            <Button
              onClick={handleChatRoom}
              className="hidden pc:flex flex-1 hover:bg-red-100 hover:border hover:border-red-200 hover:text-red-200 h-[6.4rem] p-4 rounded-[1.6rem] font-semibold pc:w-[32.8rem] pc:text-xl gap-4 border border-line-200 bg-gray-50 shadow-card pc:flex-initial"
            >
              문의하기
            </Button>
            <Image
              className="cursor-pointer border border-blue-300 rounded-[1.6rem] shadow-card block pc:hidden"
              onClick={handleChatRoom}
              src={ic_chat}
              width={64}
              height={64}
              alt="chat icon"
            />
          </div>
          <div className="hidden pc:flex pc:flex-col pc:gap-16 max-w-[30rem] w-full">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" trainerInfo={trainerInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
