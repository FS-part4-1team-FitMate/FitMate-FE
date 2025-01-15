import { Gender, LessonType, Profile, ProfileEdittable, Region, Role, User } from "@/types/types";
import instance from "./instance";

export async function postLogin(data: { email: string; password: string }): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> {
  try {
    const res = await instance.post("/auth/login", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function postSignUpUser(data: {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> {
  try {
    delete data.passwordConfirm;
    const res = await instance.post("/auth/signup/user", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function postSignUpTrainer(data: {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> {
  try {
    delete data.passwordConfirm;
    const res = await instance.post("/auth/signup/trainer", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getProfile(userId: string): Promise<Profile> {
  try {
    const res = await instance.get(`/profile/${userId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

// export async function getTrainerDetails(trainerId: string): Promise<Profile> {
//   try {
//     const res = await instance.get(`/trainers/${trainerId}`);
//     return res.data;
//   } catch (err) {
//     throw err;
//   }
// }

export async function postProfile(data: {
  profileImage?: FileList;
  name: string;
  phone: string;
  gender: Gender;
  lessonType: LessonType[];
  region: Region[];
  experience?: number;
  intro?: string;
  description?: string;
}): Promise<{
  profile: Profile;
  profileImagePresignedUrl: string;
  certificationPresignedUrl: string;
}> {
  try {
    const res = await instance.post("/profile", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function patchProfile(data: Partial<ProfileEdittable>): Promise<{
  user: User;
}> {
  try {
    const res = await instance.patch("/profile", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
