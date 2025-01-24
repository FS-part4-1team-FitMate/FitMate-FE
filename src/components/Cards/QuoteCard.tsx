import { useQuery } from "@tanstack/react-query";
import { getTrainerInfo } from "@/lib/api/trainerService";
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

  if (isError) return <div>error!</div>;

  const trainer = data?.profile || [];

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={myLesson?.lessonType as LessonType} size="lg" />
      </div>
      <p className="text-black-300 text-md font-semibold pc:text-2xl">
        고객님에게 맞춤형 레슨을 해드립니다.
      </p>
      <TrainerInfo
        name={trainer.name}
        rating={trainer.rating}
        reviewCount={trainer.reviewCount}
        experience={trainer.experience}
        lessonCount={trainer.lessonCount}
        isFavorited={true}
        favoriteCount={23}
      />
      <QuotePrice price={formatPrice(quote.price)} />
      {isLoading && <Loading />}
    </CardContainer>
  );
}
