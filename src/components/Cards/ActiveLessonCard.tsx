import toast from "react-hot-toast";
import { useGetFavoriteInfo, useGetTrainer } from "@/lib/api/queries/trainer";
import formatPrice from "@/lib/utils/formatPrice";
import { Lesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

export default function ActiveLessonCard({ item, quote }: { item: Lesson; quote: Quote }) {
  const { data: trainer, isLoading, isError } = useGetTrainer(quote?.trainerId);
  const { data: favorite } = useGetFavoriteInfo(quote?.trainerId);

  if (isLoading) return <Loading />;
  if (isError) return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile ?? {};

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={item.lessonType} />
      </div>
      <TrainerInfo
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
