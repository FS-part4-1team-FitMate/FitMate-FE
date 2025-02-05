import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptQuote, rejectQuote } from "@/lib/api/quoteService";
import { getTrainerInfo } from "@/lib/api/trainerService";
import { getFavorite } from "@/lib/api/userService";
import formatDate from "@/lib/utils/formatDate";
import formatPrice from "@/lib/utils/formatPrice";
import { MyLesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import { FavoriteInfo, Profile } from "@/types/trainer";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import Loading from "../Common/Loading";

export default function PendingLessonCard({ item, quote }: { item: MyLesson; quote: Quote }) {
  const router = useRouter();
  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useQuery<Profile>(["trainer-info", quote.trainerId], () => getTrainerInfo(quote.trainerId), {
    enabled: !!quote.trainerId,
  });

  const { data: favoriteInfo } = useQuery<FavoriteInfo>(
    ["favorite"],
    () => getFavorite(trainer?.profile.userId as string),
    { enabled: !!quote.trainerId },
  );

  const quoteAccept = useMutation({
    mutationFn: (quoteId: string) => acceptQuote(quoteId),
    onSuccess: () => {
      toast.success("견적이 확정되었습니다.");
      router.push("/user/my-lesson/active-lesson");
    },
    onError: (err) => {
      console.error("견적 확정 실패", err);
      toast.error("견적 확정에 실패하였습니다.");
    },
  });

  const handleAccept = () => {
    if (quote && quote.id) {
      quoteAccept.mutate(quote.id);
    }
  };

  const quoteReject = useMutation({
    mutationFn: (quoteId: string) => rejectQuote(quoteId),
    onSuccess: () => {
      toast.success("견적이 반려되었습니다.");
    },
    onError: (err) => {
      console.error("견적 반려 실패", err);
      toast.error("견적 반려에 실패하였습니다.");
    },
  });

  const handleReject = () => {
    if (quote && quote.id) {
      quoteReject.mutate(quote.id);
    }
  };

  if (isTrainerLoading) return <Loading />;
  if (isTrainerError) return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile ?? [];

  return (
    <CardContainer width="100%" gap="2.4rem">
      <div className="text-2lg font-medium">
        <ChipLessonType lessonType={LessonType.REHAB} size="lg" />
      </div>
      <Link href={`/user/my-lesson/pending-request/${quote.id}`}>
        <div className="flex flex-col gap-8">
          <TrainerInfo
            name={trainerInfo?.name}
            rating={trainerInfo?.rating || 0}
            reviewCount={trainerInfo?.reviewCount || 0}
            experience={trainerInfo?.experience || 0}
            lessonCount={trainerInfo?.lessonCount || 0}
            isFavorited={favoriteInfo?.isFavorite}
            favoriteCount={favoriteInfo?.favoriteTotalCount || 0}
          />
          <LessonInfo
            startDate={formatDate(item?.startDate)}
            endDate={formatDate(item?.endDate)}
            locationType={locationType_trans[item?.locationType as LocationType]}
            address={item?.roadAddress}
          />
          <QuotePrice price={formatPrice(quote.price)} />
        </div>
      </Link>
      <div className="flex gap-[1.1rem] pc:flex-row tablet:flex-row mobile:flex-col">
        {/* 버튼 공통 컴포넌트로 변경 */}
        <button
          onClick={handleAccept}
          className={
            "flex-1 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold text-gray-50 bg-blue-300"
          }
        >
          {quoteAccept.isLoading ? "견적 확정 중 ..." : "견적 확정하기"}
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
