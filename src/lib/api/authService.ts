import { Gender, LessonType, Region, Role, User } from "@/types/types";
import instance from "./instance";

export function postLogin(data: { email: string; password: string }): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
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
  phone: string;
  password: string;
}): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> {
  try {
    return instance.post("/auth/signup/user", data);
  } catch (err) {
    throw err;
  }
}

export function postSignUpTrainer(data: {
  nickname: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
}> {
  try {
    return instance.post("/auth/signup/trainer", data);
  } catch (err) {
    throw err;
  }
}

export function postProfile(data: {
  profileImage: FileList | null;
  name: string;
  phone: string;
  gender: Gender;
  lessonType: LessonType | null;
  region: Region | null;
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

export function patchProfile(data: {
  profileImage?: string | FileList | null;
  name?: string;
  phone?: string;
  gender?: Gender;
  lessonType?: LessonType | null;
  region?: Region | null;
  experience?: number;
  intro?: string;
  description?: string;
}): Promise<{
  user: User;
}> {
  try {
    return instance.patch("/auth/profile", data);
  } catch (err) {
    throw err;
  }
}
