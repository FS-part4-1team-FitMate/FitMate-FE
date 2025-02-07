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

export default function QuoteCard({ myLesson, quote }: { myLesson: Lesson; quote: Quote }) {
  const { data: trainer, isLoading, isError } = useGetTrainer(quote?.trainerId);
  const { data: favoriteInfo } = useGetFavoriteInfo(quote?.trainerId);

  if (isLoading) return <Loading />;
  if (isError) return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile || {};

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={myLesson?.lessonType} size="lg" />
      </div>
      <p className="text-black-300 text-md font-semibold pc:text-2xl">{trainerInfo?.intro}</p>
      <TrainerInfo
        name={trainerInfo.name}
        rating={trainerInfo.rating}
        reviewCount={trainerInfo.reviewCount}
        experience={trainerInfo.experience || 0}
        lessonCount={trainerInfo.lessonCount}
        isFavorited={favoriteInfo?.isFavorite}
        favoriteCount={favoriteInfo?.favoriteTotalCount}
      />
      <QuotePrice price={formatPrice(quote.price)} />
    </CardContainer>
  );
}
