import { ic_X_circle_md, ic_search_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";

interface SearchProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

export default function Search({ keyword, setKeyword, onSearch }: SearchProps) {
  const input = clsx("w-full", "text-xl font-regular", "bg-bg-200", "focus:outline-none");
  const search_wrapper = clsx(
    "flex items-center gap-[0.8rem]",
    !keyword && "flex-row-reverse",
    "w-[95.5rem] h-[6.4rem]",
    "py-[1.4rem] px-[2.4rem] rounded-[1.6rem]",
    "bg-bg-200",
  );

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
    <div className={search_wrapper}>
      <input
        className={input}
        type="text"
        placeholder="텍스트를 입력해주세요"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {!keyword && <Image src={ic_search_md} width={36} height={36} alt="검색 아이콘" />}

      {keyword && (
        <div className="flex gap-[1.6rem]">
          <Image
            className="cursor-pointer"
            src={ic_X_circle_md}
            width={36}
            height={36}
            alt="검색 초기화 아이콘"
            onClick={() => {
              setKeyword("");
            }}
          />
          <Image
            className="cursor-pointer"
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
