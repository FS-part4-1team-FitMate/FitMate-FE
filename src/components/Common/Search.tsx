import { ic_X_circle_md, ic_search_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const search_wrap = clsx(
  "flex items-center gap-[0.6rem] w-full h-full py-[1.4rem] px-[1.6rem] rounded-[1.6rem] bg-bg-200",
  "pc:gap-[0.8rem] pc:h-[6.4rem] pc:px-[2.4rem]",
);

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  const handleClearClick = () => {
    setKeyword("");
    onSearch("");
  };

  return (
    <div className={clsx(search_wrap, !keyword && "flex-row-reverse")}>
      <input
        className="w-full text-md font-regular bg-bg-200 focus:outline-none pc:text-xl"
        type="text"
        placeholder="텍스트를 입력해주세요"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {!keyword && (
        <Image
          className="w-[2.4rem] h-[2.4rem] cursor-pointer pc:w-[3.6rem] pc:h-[3.6rem]"
          src={ic_search_md}
          width={36}
          height={36}
          alt="검색 아이콘"
        />
      )}

      {keyword && (
        <div className="flex gap-[1.6rem]">
          <Image
            className="w-[2.4rem] h-[2.4rem] cursor-pointer pc:w-[3.6rem] pc:h-[3.6rem]"
            src={ic_X_circle_md}
            width={36}
            height={36}
            alt="검색 초기화 아이콘"
            onClick={handleClearClick}
          />
          <Image
            className="w-[2.4rem] h-[2.4rem] cursor-pointer pc:w-[3.6rem] pc:h-[3.6rem]"
            src={ic_search_md}
            width={36}
            height={36}
            alt="검색 아이콘"
            onClick={() => onSearch(keyword)}
          />
        </div>
      )}
    </div>
  );
}
