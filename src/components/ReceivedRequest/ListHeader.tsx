import { ic_filter_active_sm } from "@/imageExports";
import Image from "next/image";
import { userSort } from "@/types/dropdown";
import Search from "../Common/Search";
import Dropdown from "../Dropdown/Dropdown";

interface ListHeaderProps {
  totalCount: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setParams: React.Dispatch<React.SetStateAction<{}>>;
}

export default function ListHeader({ totalCount, setIsModalOpen, setParams }: ListHeaderProps) {
  // 검색 처리 함수
  const handleSearch = (keyword: string) => {
    setParams({ keyword });
  };

  // 정렬 처리 함수
  const handleSortChange = (order: string, sort: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      order,
      sort,
    }));
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <Search onSearch={handleSearch} />
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium pc:text-lg">전체 {totalCount}건</p>
        <div className="flex gap-[0.4rem]">
          <Dropdown setSortOrder={handleSortChange} options={userSort} type="sort" />
          <div className="block pc:hidden" onClick={() => setIsModalOpen(true)}>
            <Image src={ic_filter_active_sm} width={32} height={32} alt="모바일 필터" />
          </div>
        </div>
      </div>
    </div>
  );
}
