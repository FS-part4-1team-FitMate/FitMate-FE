import { QueryFunctionContext } from "@tanstack/react-query";
import { Profile, ProfileData, ProfileEdittable, User } from "@/types/types";
import { get, patch, post, remove } from "./method";

export async function getUserInfo(userId: string): Promise<ProfileData> {
  try {
    const res = await get(`/profile/${userId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function postProfile(data: Profile): Promise<ProfileData> {
  try {
    const res = await post<Profile>("/profile", data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function patchProfile(
  userId: string,
  data: Partial<ProfileEdittable>,
): Promise<{
  user: User;
}> {
  try {
    const res = await patch<Partial<ProfileEdittable>>(`/profile/${userId}`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export const getFavoriteTrainers = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<[string, { userId: string }]>) => {
  const [, { userId }] = queryKey;
  const { data } = await get(`/trainers/favorites`, {
    params: { page: pageParam },
  });
  return data;
};

export const getFavorite = async (
  trainerId: string,
): Promise<{
  isFavorite: boolean;
  favoriteTotalCount: number;
}> => {
  try {
    const res = await get(`/trainers/${trainerId}/favorite`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const toggleFavorite = async (
  isFavorite: boolean | undefined,
  trainerId: string,
): Promise<{
  isFavorite: boolean;
  favoriteTotalCount: number;
}> => {
  try {
    if (isFavorite) {
      return (await remove(`/trainers/${trainerId}/favorite`)).data;
    }
    return (await post<undefined>(`/trainers/${trainerId}/favorite`, undefined)).data;
  } catch (err) {
    throw err;
  }
};
