import { useQuery } from "@tanstack/react-query";
import { getTrainerInfo } from "@/lib/api/trainerService";
import { getFavorite } from "@/lib/api/userService";
import formatPrice from "@/lib/utils/formatPrice";
import { MyLesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

interface QuoteCardProps {
  myLesson: MyLesson;
  quote: Quote;
}

export default function QuoteCard({ myLesson, quote }: QuoteCardProps) {
  const { data, isLoading, isError } = useQuery(["trainer-info", quote.trainerId], () =>
    getTrainerInfo(quote.trainerId),
  );

  const { data: favoriteInfo } = useQuery(["favorite"], () => getFavorite(quote.trainerId));

  if (isError) return <div>error!</div>;

  const trainer = data?.profile || [];

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={myLesson?.lessonType as LessonType} size="lg" />
      </div>
      <p className="text-black-300 text-md font-semibold pc:text-2xl">{trainer?.intro}</p>
      <TrainerInfo
        name={trainer.name}
        rating={trainer.rating}
        reviewCount={trainer.reviewCount}
        experience={trainer.experience}
        lessonCount={trainer.lessonCount}
        isFavorited={favoriteInfo?.isFavorite}
        favoriteCount={favoriteInfo?.favoriteTotalCount}
      />
      <QuotePrice price={formatPrice(quote.price)} />
      {isLoading && <Loading />}
    </CardContainer>
  );
}
