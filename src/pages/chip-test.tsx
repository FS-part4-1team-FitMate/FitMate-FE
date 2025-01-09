import { LessonType, Region, RequestType } from "@/types/types";
import ChipLessonType from "@/components/Chip/ChipLessonType";
import ChipRegion from "@/components/Chip/ChipRegion";
import ChipRequest from "@/components/Chip/ChipRequest";

function ChipTest() {
  return (
    <>
      <ChipRegion region={Region.SEOUL} size="lg" />
      <ChipRegion region={Region.JEJU} size="xl" />
      <ChipLessonType lessonType={LessonType.SPORTS} size="sm" />
      <ChipLessonType lessonType={LessonType.SPORTS} size="lg" />
      <ChipLessonType lessonType={LessonType.SPORTS} size="xl" />
      <ChipLessonType lessonType={LessonType.FITNESS} size="sm" />
      <ChipLessonType lessonType={LessonType.FITNESS} size="lg" />
      <ChipLessonType lessonType={LessonType.FITNESS} size="xl" />
      <ChipLessonType lessonType={LessonType.REHAB} size="sm" />
      <ChipLessonType lessonType={LessonType.REHAB} size="lg" />
      <ChipLessonType lessonType={LessonType.REHAB} size="xl" />
      <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />
      <ChipRequest requestType={RequestType.SPECIFIC} size="xl" />
      <ChipRequest requestType={RequestType.NORMAL} size="lg" />
      <ChipRequest requestType={RequestType.NORMAL} size="xl" />
    </>
  );
}

export default ChipTest;
