import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLessonInfo } from "@/lib/api/lessonService";
import { acceptQuote, rejectQuote } from "@/lib/api/quoteService";
import { getTrainerInfo } from "@/lib/api/trainerService";
import formatDate from "@/lib/utils/formatDate";
import formatPrice from "@/lib/utils/formatPrice";
import { Lesson, MyLesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import { Profile } from "@/types/trainer";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

export default function PendingLessonCard({ item, quote }: { item: MyLesson; quote: Quote }) {
  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useQuery<Profile>(["trainer-info", quote.trainerId], () => getTrainerInfo(quote.trainerId), {
    enabled: !!quote.trainerId,
  });

  const {
    data: lesson,
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useQuery<Lesson>(["lesson-info"], () => getLessonInfo(item.id));

  const quoteAccept = useMutation({
    mutationFn: (quoteId: string) => acceptQuote(quoteId),
    onSuccess: () => {
      alert("견적이 확정되었습니다.");
    },
    onError: (err) => {
      console.error("견적 확정 실패", err);
      alert("견적 확정에 실패하였습니다.");
    },
  });

  const handleAccept = () => {
    if (item && item.id) {
      quoteAccept.mutate(item.id);
    }
  };

  const quoteReject = useMutation({
    mutationFn: (quoteId: string) => rejectQuote(quoteId),
    onSuccess: () => {
      alert("견적이 반려되었습니다.");
    },
    onError: (err) => {
      console.error("견적 반려 실패", err);
      alert("견적 반려에 실패하였습니다.");
    },
  });

  const handleReject = () => {
    if (item && item.id) {
      quoteReject.mutate(item.id);
    }
  };

  if (isTrainerLoading || isLessonLoading) {
    return <Loading />;
  }

  if (isTrainerError) return <div>트레이너 정보를 불러오지 못했습니다.</div>;
  if (isLessonError) return <div>레슨 정보를 불러오지 못했습니다.</div>;

  const trainerInfo = trainer?.profile ?? [];

  return (
    <CardContainer width="100%" gap="2.4rem">
      <div className="text-2lg font-medium">
        <ChipLessonType lessonType={LessonType.REHAB} size="lg" />
      </div>
      <TrainerInfo
        name={trainerInfo?.name}
        rating={trainerInfo?.rating || 0}
        reviewCount={trainerInfo?.reviewCount || 0}
        experience={trainerInfo?.experience || 0}
        lessonCount={trainerInfo?.lessonCount || 0}
        isFavorited={true}
        favoriteCount={23}
      />
      <Link href={`/user/my-lesson/pending-request/${item.id}`}>
        <LessonInfo
          startDate={formatDate(lesson?.startDate)}
          endDate={formatDate(lesson?.endDate)}
          locationType={locationType_trans[lesson?.locationType as LocationType]}
          address={lesson?.roadAddress}
        />
      </Link>
      <QuotePrice price={formatPrice(quote.price)} />
      <div className="flex gap-[1.1rem] pc:flex-row tablet:flex-row mobile:flex-col">
        <button
          onClick={handleAccept}
          className={
            "flex-1 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold text-gray-50 bg-blue-300"
          }
        >
          견적 확정하기
        </button>
        <button
          onClick={handleReject}
          className={
            "flex-1 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold border border-blue-300 text-blue-300 bg-gray-50"
          }
        >
          반려하기
        </button>
      </div>
    </CardContainer>
  );
}
