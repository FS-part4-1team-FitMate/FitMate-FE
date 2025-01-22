import { GenderFilter, RegionFilter, RequestFilter, ServiceFilter } from "@/types/dropdown";
import CheckboxFilter from "../CheckboxFilter";
import Dropdown from "../Dropdown/Dropdown";

const serviceFilter: ServiceFilter[] = ["REHAB", "SPORTS", "FITNESS"];
const genderFilter: GenderFilter[] = ["MALE", "FEMALE"];
const receivedRequestFilter: RequestFilter[] = ["DIRECT"];
const regionFilter: RegionFilter[] = [
  "ALL",
  "BUSAN",
  "CHUNGBUK",
  "CHUNGNAM",
  "DAEGU",
  "DAEJEON",
  "GANGWON",
  "GWANGJU",
  "GYEONGBUK",
  "GYEONGGI",
  "GYEONGNAM",
  "INCHEON",
  "JEJU",
  "JEONBUK",
  "JEONNAM",
  "SEJONG",
  "SEOUL",
  "ULSAN",
];

interface LessonFilterProps {
  count: {};
  setLessonType: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  setIsDirectQuote: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LessonFilter({
  count,
  setLessonType,
  setGender,
  region,
  setRegion,
  setIsDirectQuote,
}: LessonFilterProps) {
  const handleFilterChange = (filterType: string, value: string) => {
    if (value === "ALL") {
      value = "";
    }

    if (filterType === "lessonType") {
      setLessonType(value);
    } else if (filterType === "gender") {
      setGender(value);
    } else if (filterType === "direct") {
      setIsDirectQuote(value === "DIRECT");
    } else if (filterType === "region") {
      setRegion(value);
    }
  };

  return (
    <div className="hidden flex-col gap-[5rem] pc:flex">
      <CheckboxFilter
        label="운동 유형"
        options={serviceFilter}
        filterType="lessonType"
        onFilterChange={handleFilterChange}
        count={count}
      />
      <CheckboxFilter
        label="성별"
        options={genderFilter}
        filterType="gender"
        onFilterChange={handleFilterChange}
        count={count}
      />
      <CheckboxFilter
        label="필터"
        options={receivedRequestFilter}
        filterType="direct"
        onFilterChange={handleFilterChange}
        count={count}
      />
      <Dropdown type="filter" filterType="region" options={regionFilter} currentValue={region} />
    </div>
  );
}
