import { ic_fitness_sm, ic_health_sm, ic_sports_sm } from "@/imageExports";

export enum Role {
  USER = "USER",
  TRAINER = "TRAINER",
  ADMIN = "ADMIN",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum LessonType {
  SPORTS = "SPORTS", // 스포츠 (구기 스포츠, 계절 스포츠, 격투 스포츠 등)
  FITNESS = "FITNESS", // 피트니스 (PT, 요가, 필라테스, 식단 관리 등)
  REHAB = "REHAB", // 재활치료
}

export const lessonType_trans = {
  [LessonType.SPORTS]: { img: ic_sports_sm, ko: "스포츠" },
  [LessonType.FITNESS]: { img: ic_fitness_sm, ko: "피트니스" },
  [LessonType.REHAB]: { img: ic_health_sm, ko: "재활치료" },
};

export enum Region {
  SEOUL = "SEOUL",
  GYEONGGI = "GYEONGGI",
  INCHEON = "INCHEON",
  DAEJEON = "DAEJEON",
  DAEGU = "DAEGU",
  ULSAN = "ULSAN",
  BUSAN = "BUSAN",
  GWANGJU = "GWANGJU",
  SEJONG = "SEJONG",
  GANGWON = "GANGWON",
  CHUNGBUK = "CHUNGBUK",
  CHUNGNAM = "CHUNGNAM",
  JEONBUK = "JEONBUK",
  JEONNAM = "JEONNAM",
  GYEONGBUK = "GYEONGBUK",
  GYEONGNAM = "GYEONGNAM",
  JEJU = "JEJU",
}

export const region_trans = {
  [Region.SEOUL]: "서울",
  [Region.GYEONGGI]: "경기",
  [Region.INCHEON]: "인천",
  [Region.DAEJEON]: "대전",
  [Region.DAEGU]: "대구",
  [Region.ULSAN]: "울산",
  [Region.BUSAN]: "부산",
  [Region.GWANGJU]: "광주",
  [Region.SEJONG]: "세종",
  [Region.GANGWON]: "강원",
  [Region.CHUNGBUK]: "충북",
  [Region.CHUNGNAM]: "충남",
  [Region.JEONBUK]: "전북",
  [Region.JEONNAM]: "전남",
  [Region.GYEONGBUK]: "경북",
  [Region.GYEONGNAM]: "경남",
  [Region.JEJU]: "제주",
};

export const region_options = [
  { name: "서울", value: Region.SEOUL },
  { name: "경기", value: Region.GYEONGGI },
  { name: "인천", value: Region.INCHEON },
  { name: "대전", value: Region.DAEJEON },
  { name: "대구", value: Region.DAEGU },
  { name: "울산", value: Region.ULSAN },
  { name: "부산", value: Region.BUSAN },
  { name: "광주", value: Region.GWANGJU },
  { name: "세종", value: Region.SEJONG },
  { name: "강원", value: Region.GANGWON },
  { name: "충북", value: Region.CHUNGBUK },
  { name: "충남", value: Region.CHUNGNAM },
  { name: "전북", value: Region.JEONBUK },
  { name: "전남", value: Region.JEONNAM },
  { name: "경북", value: Region.GYEONGBUK },
  { name: "경남", value: Region.GYEONGNAM },
  { name: "제주", value: Region.JEJU },
];

export enum LocationType {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum LessonRequestStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
}

export enum QuoteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CANCELED = "CANCELED",
}

export enum NotificationType {
  CHAT_MESSAGE = "CHAT_MESSAGE",
  LESSON_CONFIRMATION = "LESSON_CONFIRMATION",
  LESSON_DATE_REMINDER = "LESSON_DATE_REMINDER",
  NEW_REQUEST = "NEW_REQUEST",
  NEW_DIRECT_LESSON = "NEW_DIRECT_LESSON",
}

export type Profile = {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  profileImage?: string | FileList;
  gender: Gender;
  lessonType: LessonType[];
  locationType: LocationType[];
  region: Region[];
  intro?: string;
  description?: string;
  experience?: number;
  certification?: string | FileList;
  certificationValidated: boolean;
  rating?: number;
  lessonCount?: number;
  reviewCount?: number;
};

export type ProfileEdittable = Pick<
  Profile,
  | "name"
  | "phone"
  | "profileImage"
  | "gender"
  | "lessonType"
  | "locationType"
  | "region"
  | "intro"
  | "description"
  | "experience"
  | "certification"
>;

export type User = {
  id: string;
  email: string;
  nickname: string;
  role: Role;
  profile?: Profile;
};
