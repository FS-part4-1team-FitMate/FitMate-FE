import { useQuery } from "@tanstack/react-query";
import { getLessonInfo } from "@/lib/api/lessonService";
import formatPrice from "@/lib/utils/formatPrice";
import { Lesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import { Profile } from "@/types/trainer";
import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

interface QuoteCardProps {
  lessonRequestId: string;
  trainer: Profile["profile"];
  quote: Quote;
}

export default function QuoteCard({ lessonRequestId, quote, trainer }: QuoteCardProps) {
  const { data, isLoading, isError } = useQuery<Lesson>(["lesson"], () =>
    getLessonInfo(lessonRequestId),
  );

  if (isError) return <div>error!</div>;

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={data?.lessonType as LessonType} size="lg" />
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
