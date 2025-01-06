import CardContainer from "../Common/Card/CardContainer";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

const description = "text-2xl font-semibold";

interface QuoteCardProps {
  rating: number;
  reviewCount: number;
  experience: number;
  lessonCount: number;
  isFavorited: boolean;
  favoriteCount: number;
  price: number;
}

export default function QuoteCard({
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
  price,
}: QuoteCardProps) {
  return (
    <CardContainer width="68.8rem" gap="1.6rem">
      <div className={description}>칩 넣을 자리</div>
      <p className={description}>고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo
        rating={rating}
        reviewCount={reviewCount}
        experience={experience}
        lessonCount={lessonCount}
        isFavorited={isFavorited}
        favoriteCount={favoriteCount}
      />
      <QuotePrice price={price} />
    </CardContainer>
  );
}
