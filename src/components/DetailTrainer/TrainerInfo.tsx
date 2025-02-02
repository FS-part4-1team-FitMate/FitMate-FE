import { ReactNode } from "react";
import { LessonType, Profile, Region } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRegion from "../Chip/ChipRegion";
import { HorizontalLine } from "../Common/Line";

interface TrainerInfoProps {
  label: string;
  children: ReactNode;
}

function TrainerContent({ label, children }: TrainerInfoProps) {
  return (
    <div className="flex flex-col gap-[2.4rem] pc:gap-16">
      <div className="flex flex-col gap-4 pc:gap-[3.2rem]">
        <h1 className="text-black-400 text-lg font-bold pc:text-2xl">{label}</h1>
        {children}
      </div>
      <HorizontalLine width="100%" />
    </div>
  );
}

export default function TrainerInfo({ profile }: { profile: Profile }) {
  return (
    <>
      <TrainerContent label="상세 설명">
        <p className="text-black-400 text-md font-normal pc:text-2lg">{profile?.description}</p>
      </TrainerContent>
      <TrainerContent label="제공 서비스">
        <div className="text-black-400 text-md font-normal pc:text-2lg">
          {profile?.lessonType?.map((lessonType: LessonType, index: number) => (
            <ChipLessonType key={index} lessonType={lessonType} size="lg" />
          ))}
        </div>
      </TrainerContent>
      <TrainerContent label="서비스 제공 지역">
        <div className="text-black-400 text-md font-normal pc:text-2lg">
          {profile?.region?.map((region: Region, index: number) => (
            <ChipRegion key={index} region={region} size="lg" />
          ))}
        </div>
      </TrainerContent>
    </>
  );
}
