import { LessonType, Region } from "@/types/types";
import ChipLessonType from "@/components/Chip/ChipLessonType";
import ChipRegion from "@/components/Chip/ChipRegion";

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
    </>
  );
}

export default ChipTest;
