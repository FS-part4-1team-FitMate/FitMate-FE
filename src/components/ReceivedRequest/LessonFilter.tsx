import { genderFilter, regionFilter, requestFilter, serviceFilter } from "@/types/dropdown";
import CheckboxFilter from "../CheckboxFilter";
import Dropdown from "../Dropdown/Dropdown";

interface LessonFilterProps {
  count: {};
  setLessonType: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  setIsDirectQuote: React.Dispatch<React.SetStateAction<boolean>>;
  lessonTypeChecked: boolean[];
  genderChecked: boolean[];
  regionChecked: boolean[];
  directChecked: boolean[];
  setLessonTypeChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setGenderChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setRegionChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setDirectChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function LessonFilter({
  count,
  setLessonType,
  setGender,
  setRegion,
  setIsDirectQuote,
  lessonTypeChecked,
  genderChecked,
  regionChecked,
  directChecked,
  setLessonTypeChecked,
  setGenderChecked,
  setRegionChecked,
  setDirectChecked,
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
        isChecked={lessonTypeChecked || []}
        setIsChecked={setLessonTypeChecked}
      />
      <CheckboxFilter
        label="성별"
        options={genderFilter}
        filterType="gender"
        onFilterChange={handleFilterChange}
        count={count}
        isChecked={genderChecked || []}
        setIsChecked={setGenderChecked}
      />
      <CheckboxFilter
        label="필터"
        options={requestFilter}
        filterType="direct"
        onFilterChange={handleFilterChange}
        count={count}
        isChecked={directChecked || []}
        setIsChecked={setDirectChecked}
      />
      <Dropdown
        type="filter"
        filterType="region"
        options={regionFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
