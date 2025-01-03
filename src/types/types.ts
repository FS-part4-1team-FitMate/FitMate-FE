enum Role {
  USER = 'USER',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN',
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

enum LessonType {
  SPORTS = 'SPORTS',
  FITNESS = 'FITNESS',
  REHAB = 'REHAB',
}

enum Region {
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

enum LocationType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

enum LessonRequestStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
}

enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}

enum NotificationType {
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  LESSON_CONFIRMATION = 'LESSON_CONFIRMATION',
  LESSON_DATE_REMINDER = 'LESSON_DATE_REMINDER',
  NEW_REQUEST = 'NEW_REQUEST',
  NEW_DIRECT_LESSON = 'NEW_DIRECT_LESSON',
}

type Profile = {
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

type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: Role;
  profile?: Profile;
}
