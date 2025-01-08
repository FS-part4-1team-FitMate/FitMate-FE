import { GenderFilter, ServiceFilter } from "@/types/dropdown";
import Dropdown from "../Dropdown/Dropdown";

export default function FilterTrainer() {
  const genderFilter: GenderFilter[] = ["전체", "남자", "여자"];
  const serviceFilter: ServiceFilter[] = ["전체", "재활운동", "스포츠", "피트니스"];

  return (
    <div className="flex flex-col gap-[3.2rem]">
      <div className="flex justify-between items-center py-[1.6rem] px-4 border-b border-line-200">
        <p className="text-xl font-medium">필터</p>
        <p className="text-gray-300 text-lg font-medium">초기화</p>
      </div>
      <Dropdown options={genderFilter} type="filter" filterType="gender" />
      <Dropdown options={serviceFilter} type="filter" filterType="service" />
    </div>
  );
}
