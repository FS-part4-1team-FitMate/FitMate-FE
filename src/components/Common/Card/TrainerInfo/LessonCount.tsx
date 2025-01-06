const container = "flex items-center gap-[0.6rem]";
const text = "text-lg font-medium";

export default function LessonCount({ lessonCount }: { lessonCount: number }) {
  return (
    <div className={container}>
      <p className={text}>{lessonCount}건</p>
      <p className={`${text} text-gray-300`}>확정</p>
    </div>
  );
}
