import Image from "next/image";
import { useState } from "react";
import X from "../../../public/assets/ic/ic_X-circle_md.svg";
import searchIcon from "../../../public/ic_search_md.svg";

interface SearchProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Search() {
  const [keyword, setKeyword] = useState<string>("");
  return (
    <div className="relative flex items-center w-full">
      <input
        className="w-[95.5rem] h-[6.4rem]"
        type="text"
        placeholder="텍스트를 입력해주세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {!keyword && (
        <Image
          className="absolute right-0"
          src={searchIcon}
          width={36}
          height={36}
          alt="검색 아이콘"
        />
      )}

      {keyword && (
        <div className="absolute flex">
          <Image
            src={X}
            width={36}
            height={36}
            alt="검색 초기화 아이콘"
            onClick={() => setKeyword("")}
          />
          <Image src={searchIcon} width={36} height={36} alt="검색 아이콘" />
        </div>
      )}
    </div>
  );
}
