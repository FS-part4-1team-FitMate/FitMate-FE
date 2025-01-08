import clsx from "clsx";
import ActiveLessonCard from "@/components/Cards/ActiveLessonCard";
import ActiveEmpty from "./ActiveEmpty";

const lesson_wrap = clsx(
  "flex flex-col gap-8",
  "p-16",
  "border border-line-100 rounded-[4rem]",
  "shadow-card bg-gray-50",
);
const lesson_title = "p-4 border-b border-line-200 text-2xl font-bold";

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
