import { LessonRequestStatus, lessonRequestStatus_trans } from "@/types/types";

interface Props {
  requestStatus: LessonRequestStatus;
  size: "lg" | "xl";
}

function ChipRequestStatus({ requestStatus, size }: Props) {
  return (
    <div
      className={`inline-block text-${size} rounded-lg border border-solid border-slate-900 text-slate-900 py-[2px] px-[3px]`}
    >
      {lessonRequestStatus_trans[requestStatus]}
    </div>
  );
}

export default ChipRequestStatus;
