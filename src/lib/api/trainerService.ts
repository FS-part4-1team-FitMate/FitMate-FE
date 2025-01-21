import { TrainerParams } from "@/types/trainer";
import { get } from "./method";

export async function getTrainerList({
  page,
  limit,
  order,
  sort,
  gender,
  lessonType,
  keyword,
}: TrainerParams) {
  const res = await get("/trainers", { page, limit, order, sort, gender, lessonType, keyword });
  return res.data;
}

export async function getFavoriteTrainers() {
  const res = await get("/trainers/favorite");
  return res.data;
}

export async function getTrainerInfo(trainerId: string) {
  const res = await get(`/profile/${trainerId}`);
  return res.data;
}
