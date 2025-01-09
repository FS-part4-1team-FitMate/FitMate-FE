import { LessonRequestStatus, lessonRequestStatus_trans } from "@/types/types";

interface Props {
  requestStatus: LessonRequestStatus;
  size: "lg" | "xl";
}

function ChipRequestStatus({ requestStatus, size }: Props) {
  return (
    <div
      className={`inline-block text-${size} rounded-lg bg-slate-100 text-slate-900 py-[4px] px-[3px]`}
    >
      {lessonRequestStatus_trans[requestStatus]}
    </div>
  );
}

export default ChipRequestStatus;
