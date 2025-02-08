import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getTrainerInfo } from "@/lib/api/trainerService";
import { getFavorite } from "@/lib/api/userService";
import { MyLesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

export default function ActiveLessonCard({ item, quote }: { item: MyLesson; quote: Quote }) {
  /**
   * @TODO UI 변경해야함
   */
  const { data, isLoading, isError } = useQuery(
    ["trainer-info", quote.trainerId],
    () => getTrainerInfo(quote.trainerId),
    {
      enabled: !!quote.trainerId,
    },
  );

  const { data: favorite } = useQuery(
    ["favorite", quote.trainerId],
    () => getFavorite(quote.trainerId),
    {
      enabled: !!quote.trainerId,
    },
  );

  if (isLoading) return <Loading />;
  if (isError) return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = data?.profile ?? {};

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={item.lessonType as LessonType} size="lg" />
      </div>
      <TrainerInfo
        name={trainerInfo.name}
        rating={trainerInfo.rating}
        reviewCount={trainerInfo.reviewCount}
        experience={trainerInfo.experience}
        lessonCount={trainerInfo.lessonCount}
        isFavorited={favorite?.isFavorite}
        favoriteCount={favorite?.favoriteTotalCount}
      />
    </CardContainer>
  );
}
