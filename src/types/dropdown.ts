export type TrainerSort = "리뷰 많은 순" | "평점 높은 순" | "경력 높은 순" | "확정 횟수 많은 순";
export type UserSort = "레슨 빠른 순" | "레슨 느린 순" | "최근 요청 순";

export type ServiceFilter = "ALL" | "REHAB" | "SPORTS" | "FITNESS";
export type GenderFilter = "ALL" | "MALE" | "FEMALE";
export type RequestFilter = "REGION" | "DIRECT";
export type PastLessonFilter = "ALL" | "COMPLETE";

// export type RegionFilter =
//   | "SEOUL"
//   | "GYEONGGI"
//   | "INCHEON"
//   | "DAEJEON"
//   | "DAEGU"
//   | "ULSAN"
//   | "BUSAN"
//   | "GWANGJU"
//   | "SEJONG"
//   | "GANGWON"
//   | "CHUNGBUK"
//   | "CHUNGNAM"
//   | "JEONBUK"
//   | "JEONNAM"
//   | "GYEONGBUK"
//   | "GYEONGNAM"
//   | "JEJU";

// export type DirectFilter = true | false;

// export type RequestFilter = {
//   type: "REGION" | "DIRECT";
//   value: string | boolean;
// };

export const filter_trans = (filter: string): string => {
  const map: { [key: string]: string } = {
    COMPLETE: "확정한 견적서",
    MALE: "남자",
    FEMALE: "여자",
    FITNESS: "피트니스",
    SPORTS: "스포츠",
    REHAB: "재활운동",
    REGION: "서비스 가능 지역",
    DIRECT: "지정 견적 요청",
    ALL: "전체",
  };

  return map[filter];
};
