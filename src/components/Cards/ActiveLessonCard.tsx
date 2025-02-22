import toast from "react-hot-toast";
import { useGetFavoriteInfo, useGetTrainer } from "@/lib/api/queries/trainer";
import formatPrice from "@/lib/utils/formatPrice";
import { Lesson, MyLessonQuote } from "@/types/lesson";
import { LessonRequestStatus, RequestType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import ChipRequestStatus from "../Chip/ChipRequestStatus";
import CardContainer from "../Common/Card/CardContainer";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

export default function ActiveLessonCard({ item, quote }: { item: Lesson; quote: MyLessonQuote }) {
  const { data: trainer, isLoading, isError } = useGetTrainer(quote?.trainerId);
  const { data: favorite } = useGetFavoriteInfo(quote?.trainerId);

  if (isLoading) return <Loading />;
  if (isError) return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile ?? {};

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipRequestStatus requestStatus={LessonRequestStatus.COMPLETED} />
        <ChipLessonType lessonType={item.lessonType} />
        {item.isDirectQuote && <ChipRequest requestType={RequestType.SPECIFIC} />}
      </div>
      <TrainerInfo
        profileImage={trainer?.profileImagePresignedUrl}
        name={trainerInfo.name}
        rating={trainerInfo.rating}
        reviewCount={trainerInfo.reviewCount}
        experience={trainerInfo.experience || 0}
        lessonCount={trainerInfo.lessonCount}
        isFavorited={favorite?.isFavorite}
        favoriteCount={favorite?.favoriteTotalCount}
      />
      <QuotePrice price={formatPrice(quote?.price)} />
    </CardContainer>
  );
}
