import { Gender, LessonType, Profile, ProfileEdittable, Region, Role, User } from "@/types/types";
import instance from "./instance";

export function postLogin(data: { email: string; password: string }): Promise<{
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}> {
  try {
    return instance.post("/auth/login", data);
  } catch (err) {
    throw err;
  }
}

export function postSignUpUser(data: {
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
    return instance.post("/auth/signup/user", data);
  } catch (err) {
    throw err;
  }
}

export function postSignUpTrainer(data: {
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
    return instance.post("/auth/signup/trainer", data);
  } catch (err) {
    throw err;
  }
}

export function getProfile(userId: string): Promise<Profile> {
  try {
    return instance.get(`/profile/${userId}`);
  } catch (err) {
    throw err;
  }
}

export function getTrainerDetails(trainerId: string): Promise<Profile> {
  try {
    return instance.get(`/trainers/${trainerId}`);
  } catch (err) {
    throw err;
  }
}

export function postProfile(data: {
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
  user: User;
}> {
  try {
    return instance.post("/auth/profile", data);
  } catch (err) {
    throw err;
  }
}

export function patchProfile(data: Partial<ProfileEdittable>): Promise<{
  user: User;
}> {
  try {
    return instance.patch("/auth/profile", data);
  } catch (err) {
    throw err;
  }
}
