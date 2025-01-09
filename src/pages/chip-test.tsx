import { LessonRequestStatus, LessonType, Region, RequestType } from "@/types/types";
import ChipLessonType from "@/components/Chip/ChipLessonType";
import ChipRegion from "@/components/Chip/ChipRegion";
import ChipRequest from "@/components/Chip/ChipRequest";
import ChipRequestStatus from "@/components/Chip/ChipRequestStatus";

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
      <ChipRequestStatus requestStatus={LessonRequestStatus.PENDING} size="lg" />
      <ChipRequestStatus requestStatus={LessonRequestStatus.PENDING} size="xl" />
      <ChipRequestStatus requestStatus={LessonRequestStatus.COMPLETED} size="lg" />
      <ChipRequestStatus requestStatus={LessonRequestStatus.COMPLETED} size="xl" />
      <ChipRequestStatus requestStatus={LessonRequestStatus.CANCELED} size="lg" />
      <ChipRequestStatus requestStatus={LessonRequestStatus.CANCELED} size="xl" />
      <ChipRequestStatus requestStatus={LessonRequestStatus.EXPIRED} size="lg" />
      <ChipRequestStatus requestStatus={LessonRequestStatus.EXPIRED} size="xl" />
    </>
  );
}

export default ChipTest;
