import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/authService";
import { LessonType, Profile } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

export default function FindTrainerCard({ trainerId }: { trainerId: string }) {
  const { data, isLoading, isError } = useQuery<Profile>({
    queryKey: ["trainer-info", trainerId],
    queryFn: () => getProfile(trainerId),
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러 발생</div>;

  /**
   * @TODO favorite 정보 추가
   */
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="text-lg font-semibold">
        <ChipLessonType lessonType={LessonType.REHAB} size="lg" />
      </div>
      <p className="text-md font-semibold pc:text-2xl">고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo
        name={data?.name || ""}
        rating={data?.rating || 0}
        reviewCount={data?.reviewCount || 0}
        experience={data?.experience || 0}
        lessonCount={data?.lessonCount || 0}
        isFavorited={true}
        favoriteCount={23}
      />
    </CardContainer>
  );
}
