import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getLessonInfo } from "@/lib/api/lessonService";
import { getTrainerInfo } from "@/lib/api/trainerService";
import formatDate from "@/lib/utils/formatDate";
import formatPrice from "@/lib/utils/formatPrice";
import { Lesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import { Trainer } from "@/types/trainer";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

const buttons = "flex gap-[1.1rem] pc:flex-row tablet:flex-row mobile:flex-col";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

export default function PendingLessonCard({ item }: { item: Quote }) {
  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useQuery<Trainer>(["trainer-info"], () => getTrainerInfo(item.trainerId));

  const {
    data: lesson,
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useQuery<Lesson>(["lesson-info"], () => getLessonInfo(item.lessonRequestId));

  if (isTrainerLoading || isLessonLoading) {
    return <Loading />;
  }
  if (isTrainerError) return <div>트레이너 정보를 불러오지 못했습니다.</div>;
  if (isLessonError) return <div>레슨 정보를 불러오지 못했습니다.</div>;
  return (
    <CardContainer width="100%" gap="2.4rem">
      <div className="text-2lg font-medium">
        <ChipLessonType lessonType={LessonType.REHAB} size="lg" />
      </div>
      <TrainerInfo
        name={trainer?.nickname}
        rating={trainer?.profile.rating}
        reviewCount={trainer?.profile.reviewCount}
        experience={trainer?.profile.experience}
        lessonCount={trainer?.profile.lessonCount}
        isFavorited={trainer?.isFavorite}
        favoriteCount={trainer?._count?.favoritedByUsers}
      />
      <LessonInfo
        startDate={formatDate(lesson?.startDate)}
        endDate={formatDate(lesson?.endDate)}
        locationType={locationType_trans[lesson?.locationType as LocationType]}
        address={lesson?.roadAddress}
      />
      <QuotePrice price={formatPrice(item.price)} />
      <div className={buttons}>
        <button className={`${button} text-gray-50 bg-blue-300`}>견적 확정하기</button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          상세보기
        </button>
      </div>
    </CardContainer>
  );
}
