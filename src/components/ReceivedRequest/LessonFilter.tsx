import { genderFilter, regionFilter, requestFilter, serviceFilter } from "@/types/dropdown";
import { FilterCheck } from "@/types/lesson";
import CheckboxFilter from "../CheckboxFilter";
import Dropdown from "../Dropdown/Dropdown";

interface LessonFilterProps {
  count: {};
  setParams: React.Dispatch<React.SetStateAction<{}>>;
  checked: FilterCheck;
  setChecked: React.Dispatch<React.SetStateAction<FilterCheck>>;
}

export default function LessonFilter({ count, setParams, checked, setChecked }: LessonFilterProps) {
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
      } else if (filterType === "direct") {
        newParams = { ...newParams, has_direct_quote: value === "DIRECT" };
      } else if (filterType === "region") {
        newParams = { ...newParams, region: value };
      }

      return newParams;
    });
  };

  return (
    <div className="hidden flex-col gap-[5rem] pc:flex">
      <CheckboxFilter
        label="운동 유형"
        options={serviceFilter}
        filterType="lessonType"
        onFilterChange={handleFilterChange}
        count={count}
        isChecked={checked.lessonType}
        setIsChecked={setChecked}
      />
      <CheckboxFilter
        label="성별"
        options={genderFilter}
        filterType="gender"
        onFilterChange={handleFilterChange}
        count={count}
        isChecked={checked.gender}
        setIsChecked={setChecked}
      />
      <CheckboxFilter
        label="필터"
        options={requestFilter}
        filterType="isDirectQuote"
        onFilterChange={handleFilterChange}
        count={count}
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
