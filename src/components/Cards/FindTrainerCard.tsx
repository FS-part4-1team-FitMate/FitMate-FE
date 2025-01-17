import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/authService";
import { Quote } from "@/types/quote";
import { LessonRequestStatus, LessonType, Profile } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequestStatus from "../Chip/ChipRequestStatus";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

interface FindTrainerCardProps {
  quoteData: Quote;
  trainerId: string;
}

export default function FindTrainerCard({ quoteData, trainerId }: FindTrainerCardProps) {
  // const { data, isLoading, isError } = useQuery<Profile>({
  //   queryKey: ["trainer-info", trainerId],
  //   queryFn: () => getProfile(trainerId),
  // });

  // if (isLoading) return <div>로딩중</div>;
  // if (isError) return <div>에러 발생</div>;

  /**
   * @TODO favorite 정보 추가 및 추가 데이터 입력
   */
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={LessonType.REHAB} size="lg" />
        <ChipRequestStatus requestStatus={LessonRequestStatus.COMPLETED} size="lg" />
      </div>
      <p className="text-md font-semibold pc:text-2xl">고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo
        name="김강사"
        rating={2}
        reviewCount={20}
        experience={2}
        lessonCount={30}
        isFavorited={true}
        favoriteCount={23}
      />
    </CardContainer>
  );
}
