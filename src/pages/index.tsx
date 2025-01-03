import { GenderFilter, ServiceFilter, TrainerSort, UserSort } from "@/types/dropdown";
import Dropdown from "@/components/Dropdown/Dropdown";

export default function Home() {
  const options1: TrainerSort = [
    "리뷰 많은 순",
    "평점 높은 순",
    "경력 높은 순",
    "확정 횟수 많은 순",
  ];

  const options2: UserSort = ["레슨 빠른 순", "레슨 느린 순", "최근 요청 순"];
  const option3: ServiceFilter = ["전체", "재활운동", "스포츠", "피트니스"];
  const option4: GenderFilter = ["전체", "남자", "여자"];

  return (
    <div className="flex bg-pink-200">
      <Dropdown options={options1} type="sort" />
      <Dropdown options={options2} type="sort" />
      <Dropdown options={option3} type="filter" filterType="service" />
      <Dropdown options={option4} type="filter" filterType="gender" />
    </div>
  );
}
