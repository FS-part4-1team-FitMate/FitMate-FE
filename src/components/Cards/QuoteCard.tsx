import CardContainer from "../Common/Card/CardContainer";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

const description = "text-2xl font-semibold";

/**
 *
 * @TODO replace any
 */
export default function QuoteCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className={description}>칩 넣을 자리</div>
      <p className={description}>고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo
        rating={item.rating}
        reviewCount={item.reviewCount}
        experience={item.experience}
        lessonCount={item.lessonCount}
        isFavorited={item.isFavorited}
        favoriteCount={item.favoriteCount}
      />
      <QuotePrice price={item.price} />
    </CardContainer>
  );
}
