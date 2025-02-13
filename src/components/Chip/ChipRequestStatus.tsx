import { LessonRequestStatus, lessonRequestStatus_trans } from "@/types/types";

export default function ChipRequestStatus({
  requestStatus,
}: {
  requestStatus: LessonRequestStatus;
}) {
  return (
    <div className="inline-flex w-fit py-[2px] px-[6px] rounded-lg text-blue-400 text-sm font-regular bg-slate-100 shadow-chip pc:text-lg">
      {lessonRequestStatus_trans[requestStatus]}
    </div>
  );
}
