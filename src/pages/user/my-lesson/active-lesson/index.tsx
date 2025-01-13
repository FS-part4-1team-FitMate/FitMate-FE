import ActiveLessonSection from "@/components/ActiveLesson/ActiveLessonSection";

export default function ActiveLesson() {
  const items = new Array(1).fill("");
  const items2 = new Array(0).fill("");

  return (
    <div className="flex max-w-[192rem] m-auto py-16 px-8 bg-bg-100 pc:py-[6.4rem]">
      <div className="flex flex-col gap-8 max-w-[140rem] w-full m-auto">
        <ActiveLessonSection title="재활운동" items={items} />
        <ActiveLessonSection title="스포츠" items={items} />
        <ActiveLessonSection title="피트니스" items={items2} />
      </div>
    </div>
  );
}
