const container = "flex items-center gap-[0.6rem]";
const text = "text-lg font-medium";

export default function LessonCount() {
  return (
    <div className={container}>
      <p className={text}>330건</p>
      <p className={`${text} text-gray-300`}>확정</p>
    </div>
  );
}
