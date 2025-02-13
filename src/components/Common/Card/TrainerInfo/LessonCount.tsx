import clsx from "clsx";

export default function LessonCount({
  lessonCount,
  size = "lg",
}: {
  lessonCount?: number;
  size?: "sm" | "lg";
}) {
  return (
    <div className={clsx("flex items-center gap-[0.4rem]", size === "lg" && "pc:gap-[0.6rem]")}>
      <p className={clsx("text-sm font-medium", size === "lg" && "pc:text-lg")}>
        {lessonCount || 0}건
      </p>
      <p className={clsx("text-gray-300 text-sm font-medium", size === "lg" && "pc:text-lg")}>
        확정
      </p>
    </div>
  );
}
