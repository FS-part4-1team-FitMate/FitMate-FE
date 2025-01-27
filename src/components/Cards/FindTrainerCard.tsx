import { FavoriteInfo, Profile, Trainer } from "@/types/trainer";
import { LessonType, RequestType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

interface FindTrainerCardProps {
  item?: Trainer;
  profile?: Profile["profile"];
  status?: string;
  request?: boolean;
  favoriteInfo?: FavoriteInfo;
}

export default function FindTrainerCard({
  item,
  profile,
  status,
  request,
  favoriteInfo,
}: FindTrainerCardProps) {
  if (item) {
    return (
      <CardContainer width="100%" gap="1.6rem">
        <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
          {item?.profile?.lessonType?.map((lessonType, index) => (
            <ChipLessonType key={index} lessonType={lessonType as LessonType} size="lg" />
          ))}
          {request && <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />}
        </div>
        <p className="text-md font-semibold pc:text-2xl">{item?.profile?.intro}</p>
        <TrainerInfo
          name={item?.nickname}
          rating={item?.profile?.rating || 0}
          reviewCount={item?.profile?.reviewCount || 0}
          experience={item?.profile?.experience || 0}
          lessonCount={item?.profile?.lessonCount || 0}
          isFavorited={item?.isFavorite}
          favoriteCount={item?._count?.favoritedByUsers || 0}
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
          {profile?.lessonType?.map((lessonType, index) => (
            <ChipLessonType key={index} lessonType={lessonType} size="lg" />
          ))}
          {request && <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />}
        </div>
        <p className="text-md font-semibold pc:text-2xl">{profile?.intro}</p>
        <TrainerInfo
          name={profile?.name}
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
