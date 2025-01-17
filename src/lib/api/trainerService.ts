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
