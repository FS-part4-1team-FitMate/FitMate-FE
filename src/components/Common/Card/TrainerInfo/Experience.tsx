import clsx from "clsx";

export default function Experience({
  experience,
  size = "lg",
}: {
  experience?: number;
  size?: "sm" | "lg";
}) {
  return (
    <div className={clsx("flex items-center gap-[0.4rem]", size === "lg" && "pc:gap-[0.6rem]")}>
      <p className={clsx("text-gray-300 text-sm font-medium", size === "lg" && "pc:text-lg")}>
        경력
      </p>
      <p className={clsx("text-sm font-medium", size === "lg" && "pc:text-lg")}>
        {experience || 0}년
      </p>
    </div>
  );
}
