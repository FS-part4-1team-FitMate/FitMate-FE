import path from "path";

export type TrainerSort = "리뷰 많은 순" | "평점 높은 순" | "경력 높은 순" | "확정 횟수 많은 순";
export type UserSort = "레슨 빠른 순" | "레슨 느린 순" | "최근 요청 순";

type ServiceFilter = "ALL" | "REHAB" | "SPORTS" | "FITNESS";
type GenderFilter = "ALL" | "MALE" | "FEMALE";
type RequestFilter = "DIRECT";
type PastLessonFilter = "ALL" | "ACCEPTED";

type RegionFilter =
  | "ALL"
  | "SEOUL"
  | "GYEONGGI"
  | "INCHEON"
  | "DAEJEON"
  | "DAEGU"
  | "ULSAN"
  | "BUSAN"
  | "GWANGJU"
  | "SEJONG"
  | "GANGWON"
  | "CHUNGBUK"
  | "CHUNGNAM"
  | "JEONBUK"
  | "JEONNAM"
  | "GYEONGBUK"
  | "GYEONGNAM"
  | "JEJU";

export const serviceFilter: ServiceFilter[] = ["REHAB", "SPORTS", "FITNESS"];
export const genderFilter: GenderFilter[] = ["MALE", "FEMALE"];
export const requestFilter: RequestFilter[] = ["DIRECT"];
export const pastLessonFilter: PastLessonFilter[] = ["ALL", "ACCEPTED"];
export const regionFilter: RegionFilter[] = [
  "ALL",
  "SEOUL",
  "GYEONGGI",
  "INCHEON",
  "GANGWON",
  "CHUNGBUK",
  "CHUNGNAM",
  "SEJONG",
  "DAEJEON",
  "GYEONGBUK",
  "GYEONGNAM",
  "DAEGU",
  "ULSAN",
  "JEONBUK",
  "JEONNAM",
  "GWANGJU",
  "BUSAN",
  "JEJU",
];

export const filter_trans = (filter: string): string => {
  const map: { [key: string]: string } = {
    COMPLETE: "확정한 견적서",
    MALE: "남자",
    FEMALE: "여자",
    FITNESS: "피트니스",
    SPORTS: "스포츠",
    REHAB: "재활운동",
    DIRECT: "지정 견적 요청",
    ACCEPTED: "확정한 견적",
    ALL: "전체",
    SEOUL: "서울",
    GYEONGGI: "경기",
    INCHEON: "인천",
    DAEJEON: "대전",
    DAEGU: "대구",
    ULSAN: "울산",
    BUSAN: "부산",
    GWANGJU: "광주",
    SEJONG: "세종",
    GANGWON: "강원",
    CHUNGBUK: "충북",
    CHUNGNAM: "충남",
    JEONBUK: "전북",
    JEONNAM: "전남",
    GYEONGBUK: "경북",
    GYEONGNAM: "경남",
    JEJU: "제주",
  };

  return map[filter];
};
