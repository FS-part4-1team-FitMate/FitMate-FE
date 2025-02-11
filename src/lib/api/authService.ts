import { User } from "@/types/types";
import { post } from "./method";

export async function postLogin(data: { email: string; password: string }): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string;
  hasProfile: boolean;
}> {
  try {
    const res = await post("/auth/login", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function sendEmailVeriKey(email: string): Promise<{
  message: string;
}> {
  try {
    const res = await post("/auth/email-verification", { email });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function checkEmailVeriKey(data: { email: string; code: string }): Promise<{
  message: string;
}> {
  try {
    const res = await post("/auth/verify-code", data);
    return res.data;
  } catch (err) {
    const error = err as { response: { data: { message: string } } };
    return error?.response?.data;
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
    const res = await post("/auth/signup?role=USER", data);
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
    const res = await post("/auth/signup?role=TRAINER", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}
