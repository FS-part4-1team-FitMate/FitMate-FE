import PendingLessonCard from "@/components/Cards/PendingLessonCard";

export default function PendingRequest() {
  const items = new Array(10).fill("");

  return (
    <div className="grid grid-cols-2 gap-x-[2.4rem] gap-y-[4.8rem] max-w-[140rem] mx-auto mt-16">
      {items.map((item, index) => (
        <PendingLessonCard key={index} item={item} />
      ))}
    </div>
  );
}
