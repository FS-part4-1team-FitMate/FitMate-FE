import clsx from "clsx";

const title_wrap = clsx(
  "w-full pc:max-w-[192rem] tablet:max-w-[74.4rem] mobile:max-w-[37.5rem]",
  "pc:h-full tablet:h-[5.4rem] mobile:h-[5.4rem]",
  "pc:py-[3.2rem] pc:px-[26rem] tablet:py-4 tablet:px-[7.2rem] mobile:py-4 mobile:px-12",
);

export default function Title({ title }: { title: string }) {
  return (
    <div className={title_wrap}>
      <h1 className="font-semibold pc:text-2xl tablet:text-2lg mobile:text-2lg">{title}</h1>
    </div>
  );
}
