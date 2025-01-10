import clsx from "clsx";
import ActiveLessonCard from "@/components/Cards/ActiveLessonCard";
import ActiveEmpty from "./ActiveEmpty";

const lesson_wrap = clsx(
  "flex flex-col gap-8",
  "border border-line-100 rounded-[4rem]",
  "shadow-card bg-gray-50",
  "pc:p-16 tablet:p-10 mobile:p-10",
);
const lesson_title = clsx(
  "p-4 border-b border-line-200 font-bold",
  "pc:text-2xl tablet:text-xl mobile:text-xl",
);

export default function ActiveLessonSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={lesson_wrap}>
      <h1 className={lesson_title}>{title}</h1>
      {items.length > 0 ? (
        items.map((item, index) => <ActiveLessonCard key={index} item={item} />)
      ) : (
        <ActiveEmpty />
      )}
    </div>
  );
}
