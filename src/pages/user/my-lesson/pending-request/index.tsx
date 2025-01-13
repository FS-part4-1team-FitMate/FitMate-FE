import PendingLessonCard from "@/components/Cards/PendingLessonCard";

export default function PendingRequest() {
  const items = new Array(10).fill("");

  return (
    <div className="flex flex-col gap-[2.4rem] mx-auto mt-16 px-8 pc:grid pc:grid-cols-2 pc:gap-x-[2.4rem] pc:gap-y-[4.8rem] pc:max-w-[140rem] tablet:max-w-[64rem] mobile:max-w-[36.7rem]">
      {items.map((item, index) => (
        <PendingLessonCard key={index} item={item} />
      ))}
    </div>
  );
}
