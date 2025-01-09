const text = "font-medium pc:text-lg tablet:text-sm mobile:text-sm";

export default function LessonCount({ lessonCount }: { lessonCount?: number }) {
  return (
    <div className="flex items-center pc:gap-[0.6rem] tablet:gap-[0.4rem] mobile:gap-[0.4rem]">
      <p className={text}>{lessonCount}건</p>
      <p className={`${text} text-gray-300`}>확정</p>
    </div>
  );
}
