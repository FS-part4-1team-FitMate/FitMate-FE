import { GenderFilter, ServiceFilter } from "@/types/dropdown";
import Dropdown from "../Dropdown/Dropdown";

export default function Filter() {
  const genderFilter: GenderFilter[] = ["전체", "남자", "여자"];
  const serviceFilter: ServiceFilter[] = ["전체", "재활운동", "스포츠", "피트니스"];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p>필터</p>
        <p>초기화</p>
      </div>
      <Dropdown options={genderFilter} type="filter" filterType="gender" />
      <Dropdown options={serviceFilter} type="filter" filterType="service" />
    </div>
  );
}
