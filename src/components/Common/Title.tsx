import clsx from "clsx";

const title_wrap = clsx(
  "flex items-center w-full h-[5.4rem] mx-12 pt-8",
  "pc:max-w-[192rem] tablet:max-w-[74.4rem] mobile:max-w-[37.5rem]",
  "pc:h-full",
);

export default function Title({ title }: { title: string }) {
  return (
    <div className={title_wrap}>
      <h1 className="font-semibold pc:text-2xl tablet:text-2lg mobile:text-2lg">{title}</h1>
    </div>
  );
}
