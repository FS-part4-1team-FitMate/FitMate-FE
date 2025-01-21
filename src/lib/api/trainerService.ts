import { TrainerParams } from "@/types/trainer";
import { get, post, remove } from "./method";

// 강사 목록 조회
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

// 강사 상세 정보
export async function getTrainerInfo(trainerId: string) {
  const res = await get(`/profile/${trainerId}`);
  return res.data;
}

// 찜한 강사 목록 조회
export async function getFavoriteTrainers() {
  const res = await get("/trainers/favorite");
  return res.data;
}

// 강사 좋아요
export async function createFavoriteTrainer(trainerId: string) {
  const res = await post("/trainers/favorite", trainerId);
  return res.data;
}

// 강사 좋아요 취소
export async function deleteFavoriteTrainer(trainerId: string) {
  const res = await remove("/trainers/favorite", trainerId);
  return res.data;
}
