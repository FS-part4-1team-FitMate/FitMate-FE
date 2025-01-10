import FavoiriteTrainerCard from "../Cards/FavoriteTrainerCard";

/**
 *
 * @TODO replace any
 */
export default function FavoriteTrainer({ items }: { items: any }) {
  return (
    <div className="flex-col pc:flex tablet:hidden mobile:hidden">
      <p className="text-xl font-semibold">찜한 기사님</p>
      <FavoiriteTrainerCard
        rating={5}
        reviewCount={5}
        experience={5}
        lessonCount={5}
        isFavorited={true}
        favoriteCount={2}
      />
    </div>
  );
}
