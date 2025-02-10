import { FavoriteInfo, Profile, Trainer } from "@/types/trainer";
import { LessonType, RequestType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

interface FindTrainerCardProps {
  trainer?: Trainer;
  profile?: Profile["profile"];
  status?: string;
  request?: boolean;
  favoriteInfo?: FavoriteInfo;
}

export default function FindTrainerCard({
  trainer,
  profile,
  status,
  request,
  favoriteInfo,
}: FindTrainerCardProps) {
  if (trainer) {
    return (
      <CardContainer width="100%" gap="1.6rem">
        <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
          {trainer?.profile?.lessonType?.map((lessonType: LessonType, index: number) => (
            <ChipLessonType key={index} lessonType={lessonType} size="lg" />
          ))}
          {request && <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />}
        </div>
        <p className="text-md font-semibold pc:text-2xl">{trainer?.profile?.intro}</p>
        <TrainerInfo
          name={trainer?.nickname}
          rating={trainer?.profile?.rating || 0}
          reviewCount={trainer?.profile?.reviewCount || 0}
          experience={trainer?.profile?.experience || 0}
          lessonCount={trainer?.profile?.lessonCount || 0}
          isFavorited={trainer?.isFavorite}
          favoriteCount={trainer?._count?.favoritedByUsers || 0}
        />
      </CardContainer>
    );
  }

  if (profile) {
    return (
      <CardContainer width="100%" gap="1.6rem">
        <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
          {status === "ACCEPTED" && (
            <div
              className={`inline-block text-lg rounded-lg bg-slate-100 text-blue-400 py-[6px] px-[4px]`}
            >
              확정 견적
            </div>
          )}
          {profile?.lessonType?.map((lessonType: LessonType, index: number) => (
            <ChipLessonType key={index} lessonType={lessonType} size="lg" />
          ))}
          {request && <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />}
        </div>
        <p className="text-md font-semibold pc:text-2xl">{profile?.intro}</p>
        <TrainerInfo
          name={profile?.name || ""}
          rating={profile?.rating || 0}
          reviewCount={profile.reviewCount || 0}
          experience={profile?.experience || 0}
          lessonCount={profile?.lessonCount || 0}
          isFavorited={favoriteInfo?.isFavorite}
          favoriteCount={favoriteInfo?.favoriteTotalCount || 0}
        />
      </CardContainer>
    );
  }
}
