export enum Role {
  USER = 'USER',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum LessonType {
  SPORTS = 'SPORTS', // 스포츠 (구기 스포츠, 계절 스포츠, 격투 스포츠 등)
  FITNESS = 'FITNESS', // 피트니스 (PT, 요가, 필라테스, 식단 관리 등)
  REHAB = 'REHAB', // 재활치료
}

export enum Region {
  SEOUL = 'SEOUL',
  GYEONGGI = 'GYEONGGI',
  INCHEON = 'INCHEON',
  GANGWON = 'GANGWON',
  CHUNGBUK = 'CHUNGBUK',
  CHUNGNAM = 'CHUNGNAM',
  DAEGU = 'DAEGU',
  DAEJEON = 'DAEJEON',
  BUSAN = 'BUSAN',
  ULSAN = 'ULSAN',
  GWANGJU = 'GWANGJU',
  JEJU = 'JEJU',
}

export enum LocationType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum LessonRequestStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
}

export enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}

export enum NotificationType {
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  LESSON_CONFIRMATION = 'LESSON_CONFIRMATION',
  LESSON_DATE_REMINDER = 'LESSON_DATE_REMINDER',
  NEW_REQUEST = 'NEW_REQUEST',
  NEW_DIRECT_LESSON = 'NEW_DIRECT_LESSON',
}

export type Profile = {
  id: string;
  userId: string;
  nickname: string;
  profileImage?: string;
  gender: Gender;
  lessonType: LessonType[];
  region: Region[];
  intro?: string;
  description?: string;
  experience?: number;
  certifications?: string;
  certificationValidated: boolean;
  rating?: number;
  lessonCount?: number;
  reviewCount?: number;
}

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: Role;
  profile?: Profile;
}
