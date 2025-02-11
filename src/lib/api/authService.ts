import { User } from "@/types/types";
import instance from "./instance";

export async function postLogin(data: { email: string; password: string }): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
  hasProfile: boolean;
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
    const res = await instance.post("/auth/signup?role=USER", data);
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
    const res = await instance.post("/auth/signup?role=TRAINER", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
