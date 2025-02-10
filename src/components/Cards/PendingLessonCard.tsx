import Link from "next/link";
import toast from "react-hot-toast";
import { useQuoteAccept, useQuoteRejection } from "@/lib/api/queries/quote";
import { useGetFavoriteInfo, useGetTrainer } from "@/lib/api/queries/trainer";
import formatDate from "@/lib/utils/formatDate";
import formatPrice from "@/lib/utils/formatPrice";
import { Lesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import { locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequestStatus from "../Chip/ChipRequestStatus";
import Button from "../Common/Button";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

export default function PendingLessonCard({ item, quote }: { item: Lesson; quote: Quote }) {
  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useGetTrainer(quote?.trainerId);

  const { data: favoriteInfo } = useGetFavoriteInfo(quote?.trainerId);

  const quoteAccept = useQuoteAccept();
  const handleAccept = () => {
    if (quote && quote.id) {
      quoteAccept.mutate(quote.id);
    }
  };

  const quoteReject = useQuoteRejection();
  const handleReject = () => {
    if (quote && quote.id) {
      quoteReject.mutate(quote.id);
    }
  };

  if (isTrainerLoading) return <Loading />;
  if (isTrainerError) return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile ?? [];

  return (
    <CardContainer width="100%" gap="2.4rem">
      <div className="flex items-center gap-[1.2rem]">
        <ChipRequestStatus requestStatus={item.status} />
        <ChipLessonType lessonType={item.lessonType} />
      </div>
      <Link href={`/user/my-lesson/pending-request/${quote.id}`}>
        <div className="flex flex-col gap-8">
          <TrainerInfo
            name={trainerInfo?.name}
            rating={trainerInfo?.rating || 0}
            reviewCount={trainerInfo?.reviewCount || 0}
            experience={trainerInfo?.experience || 0}
            lessonCount={trainerInfo?.lessonCount || 0}
            isFavorited={favoriteInfo?.isFavorite}
            favoriteCount={favoriteInfo?.favoriteTotalCount || 0}
          />
          <LessonInfo
            startDate={formatDate(item?.startDate)}
            endDate={formatDate(item?.endDate)}
            locationType={locationType_trans[item?.locationType]}
            address={item?.roadAddress}
          />
          <QuotePrice price={formatPrice(quote.price)} />
        </div>
      </Link>
      <div className="flex gap-[1.1rem] pc:flex-row tablet:flex-row mobile:flex-col">
        <Button
          onClick={handleAccept}
          className={
            "flex-1 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold text-gray-50 bg-blue-300"
          }
        >
          {quoteAccept.isLoading ? "견적 확정 중 ..." : "견적 확정하기"}
        </Button>
        <Button
          onClick={handleReject}
          className={
            "flex-1 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold border border-blue-300 text-blue-300 bg-gray-50"
          }
        >
          반려하기
        </Button>
      </div>
    </CardContainer>
  );
}
