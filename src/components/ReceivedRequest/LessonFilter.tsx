import { genderFilter, regionFilter, requestFilter, serviceFilter } from "@/types/dropdown";
import { FilterCheck } from "@/types/lesson";
import CheckboxFilter from "../CheckboxFilter";
import Dropdown from "../Dropdown/Dropdown";

interface LessonFilterProps {
  setParams: React.Dispatch<React.SetStateAction<{}>>;
  checked: FilterCheck;
  setChecked: React.Dispatch<React.SetStateAction<FilterCheck>>;
}

export default function LessonFilter({ setParams, checked, setChecked }: LessonFilterProps) {
  const handleFilterChange = (filterType: string, value: string) => {
    if (value === "ALL") {
      value = "";
    }

    setParams((prevState) => {
      let newParams = { ...prevState };

      if (filterType === "lessonType") {
        newParams = { ...newParams, lesson_type: value };
      } else if (filterType === "gender") {
        newParams = { ...newParams, gender: value };
      } else if (filterType === "isDirectQuote") {
        newParams = { ...newParams, has_direct_quote: value === "DIRECT" };
      } else if (filterType === "region") {
        newParams = { ...newParams, region: value };
      }

      return newParams;
    });
  };

  return (
    <div className="flex flex-col gap-4 w-[13rem] pc:gap-[5rem] pc:w-[32.8rem]">
      <CheckboxFilter
        label="운동 유형"
        options={serviceFilter}
        filterType="lessonType"
        onFilterChange={handleFilterChange}
        isChecked={checked.lessonType}
        setIsChecked={setChecked}
      />
      <CheckboxFilter
        label="성별"
        options={genderFilter}
        filterType="gender"
        onFilterChange={handleFilterChange}
        isChecked={checked.gender}
        setIsChecked={setChecked}
      />
      <CheckboxFilter
        label="필터"
        options={requestFilter}
        filterType="isDirectQuote"
        onFilterChange={handleFilterChange}
        isChecked={checked.isDirectQuote}
        setIsChecked={setChecked}
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
