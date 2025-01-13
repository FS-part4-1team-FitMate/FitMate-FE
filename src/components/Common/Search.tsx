import { ic_X_circle_md, ic_search_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";

const search_wrap = clsx(
  "flex items-center w-full rounded-[1.6rem] bg-bg-200",
  "pc:gap-[0.8rem] pc:h-[6.4rem] pc:py-[1.4rem] pc:px-[2.4rem]",
  "tablet:gap-[0.6rem] tablet:h-full tablet:py-[1.4rem] tablet:px-[1.6rem]",
  "mobile:gap-[0.6rem] mobile:h-full mobile:py-[1.4rem] mobile:px-[1.6rem]",
);

const input = clsx(
  "w-full",
  "font-regular bg-bg-200",
  "focus:outline-none",
  "pc:text-xl tablet:text-md mobile:text-md",
);

const icon = clsx(
  "cursor-pointer",
  "pc:w-[3.6rem] tablet:w-[2.4rem] mobile:w-[2.4rem]",
  "pc:h-[3.6rem] tablet:h-[2.4rem] mobile:h-[2.4rem]",
);

interface SearchProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

export default function Search({ keyword, setKeyword, onSearch }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={clsx(search_wrap, !keyword && "flex-row-reverse")}>
      <input
        className={input}
        type="text"
        placeholder="텍스트를 입력해주세요"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {!keyword && (
        <Image className={icon} src={ic_search_md} width={36} height={36} alt="검색 아이콘" />
      )}

      {keyword && (
        <div className="flex gap-[1.6rem]">
          <Image
            className={icon}
            src={ic_X_circle_md}
            width={36}
            height={36}
            alt="검색 초기화 아이콘"
            onClick={() => {
              setKeyword("");
            }}
          />
          <Image
            className={icon}
            src={ic_search_md}
            width={36}
            height={36}
            alt="검색 아이콘"
            onClick={onSearch}
          />
        </div>
      )}
    </div>
  );
}
