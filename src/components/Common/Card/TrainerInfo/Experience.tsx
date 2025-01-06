const container = "flex items-center gap-[0.6rem]";
const text = "text-lg font-medium";

export default function Experience({ experience }: { experience: number }) {
  return (
    <div className={container}>
      <p className={`${text} text-gray-300`}>경력</p>
      <p className={text}>{experience}년</p>
    </div>
  );
}
