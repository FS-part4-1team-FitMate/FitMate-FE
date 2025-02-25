import { ic_designate_sm, ic_fitness_sm, ic_health_sm, ic_sports_sm } from "@/imageExports";

export enum Role {
  USER = "USER",
  TRAINER = "TRAINER",
  ADMIN = "ADMIN",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const gender_trans = {
  [Gender.MALE]: "남성",
  [Gender.FEMALE]: "여성",
};

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

export enum LessonSubType {
  // SPORTS
  SOCCER = "SOCCER",
  BASKETBALL = "BASKETBALL",
  BASEBALL = "BASEBALL",
  TENNIS = "TENNIS",
  BADMINTON = "BADMINTON",
  TABLE_TENNIS = "TABLE_TENNIS",
  SKI = "SKI",
  SURFING = "SURFING",
  BOXING = "BOXING",
  TAEKWONDO = "TAEKWONDO",
  JIUJITSU = "JIUJITSU",

  // FITNESS
  PERSONAL_TRAINING = "PERSONAL_TRAINING",
  YOGA = "YOGA",
  PILATES = "PILATES",
  DIET_MANAGEMENT = "DIET_MANAGEMENT",

  // REHAB
  STRETCHING = "STRETCHING",
  REHAB_TREATMENT = "REHAB_TREATMENT",
}

export const lessonSubType_trans = {
  [LessonSubType.SOCCER]: "축구",
  [LessonSubType.BASKETBALL]: "농구",
  [LessonSubType.BASEBALL]: "야구",
  [LessonSubType.TENNIS]: "테니스",
  [LessonSubType.BADMINTON]: "배드민턴",
  [LessonSubType.TABLE_TENNIS]: "탁구",
  [LessonSubType.SKI]: "스키",
  [LessonSubType.SURFING]: "서핑",
  [LessonSubType.BOXING]: "복싱",
  [LessonSubType.TAEKWONDO]: "태권도",
  [LessonSubType.JIUJITSU]: "주짓수",
  [LessonSubType.PERSONAL_TRAINING]: "PT",
  [LessonSubType.YOGA]: "요가",
  [LessonSubType.PILATES]: "필라테스",
  [LessonSubType.DIET_MANAGEMENT]: "식단관리",
  [LessonSubType.STRETCHING]: "스트레칭",
  [LessonSubType.REHAB_TREATMENT]: "재활치료",
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

export const locationType_trans = {
  [LocationType.ONLINE]: "온라인",
  [LocationType.OFFLINE]: "오프라인",
};

export enum RequestType {
  NORMAL = "NORMAL",
  SPECIFIC = "SPECIFIC",
}

export const requestType_trans = {
  [RequestType.NORMAL]: { img: null, ko: "일반 견적요청" },
  [RequestType.SPECIFIC]: { img: ic_designate_sm, ko: "지정 견적요청" },
};

export enum LessonRequestStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
}

export const lessonRequestStatus_trans = {
  [LessonRequestStatus.ACCEPTED]: "견적 수락됨",
  [LessonRequestStatus.PENDING]: "견적 대기중",
  [LessonRequestStatus.COMPLETED]: "확정 견적",
  [LessonRequestStatus.CANCELED]: "견적 취소됨",
  [LessonRequestStatus.EXPIRED]: "견적 기한만료",
};

export enum QuoteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CANCELED = "CANCELED",
}

export type Profile = {
  id?: string | null;
  userId?: string | null;
  name: string;
  phone?: string | null;
  profileImage?: string | FileList | null;
  profileImageCount?: number | null;
  contentType?: string | null;
  gender: Gender;
  lessonType: LessonType[];
  locationType?: LocationType[];
  region: Region[];
  intro?: string | null;
  description?: string | null;
  experience?: number | null;
  certification?: string | FileList | null;
  certificationCount?: number | null;
  certificationValidated?: boolean | null;
  rating?: number | null;
  lessonCount?: number | null;
  reviewCount?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export interface ProfileData {
  profile: Profile;
  profileImagePresignedUrl?: string | null;
  certificationPresignedUrl?: string | null;
}

export type ProfileEdittable = Pick<
  Profile,
  | "name"
  | "phone"
  | "profileImage"
  | "profileImageCount"
  | "contentType"
  | "gender"
  | "lessonType"
  | "locationType"
  | "region"
  | "intro"
  | "description"
  | "experience"
  | "certification"
  | "certificationCount"
  | "updatedAt"
>;

export type User = {
  id: string;
  email: string;
  nickname: string;
  role: Role;
  hasProfile?: boolean | null;
  profile?: Profile | null;
  profileImagePresignedUrl?: string | null;
  certificationPresignedUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LSUserData = {
  user: User;
  hasProfile: boolean;
  accessToken: string;
  refreshToken: string;
};
