import clsx from "clsx";
import React from "react";
import { Lesson } from "@/types/lesson";
import ActiveLessonCard from "@/components/Cards/ActiveLessonCard";
import ActiveEmpty from "./ActiveEmpty";

export default function ActiveLessonSection({ title, items }: { title: string; items: Lesson[] }) {
  const getCard = () => {
    if (items.length > 0) {
      return (
        <>
          {items.map((item: Lesson) => (
            <React.Fragment key={item.id}>
              {item.lessonQuotes.map(
                (quote) =>
                  quote.status === "ACCEPTED" && (
                    <ActiveLessonCard key={quote.id} item={item} quote={quote} />
                  ),
              )}
            </React.Fragment>
          ))}
        </>
      );
    } else {
      return <ActiveEmpty />;
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-8 p-10 border border-line-100 rounded-[4rem]",
        "shadow-card bg-gray-50 pc:p-16",
      )}
    >
      <h1 className="p-4 border-b border-line-200 text-xl font-bold pc:text-2xl">{title}</h1>
      {getCard()}
    </div>
  );
}
