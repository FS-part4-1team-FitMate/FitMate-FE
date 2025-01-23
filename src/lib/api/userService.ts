import { QueryFunctionContext } from "@tanstack/react-query";
import instance from "./instance";

export const getFavoriteTrainers = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<[string, { userId: string }]>) => {
  const [, { userId }] = queryKey;
  const { data } = await instance.get(`/users/${userId}/favorites`, {
    params: { page: pageParam },
  });
  return data;
};

export const getFavorite = (
  trainerId: string,
): Promise<{
  isFavorite: boolean;
  favoriteTotalCount: number;
}> => {
  try {
    return instance.get(`/trainers/${trainerId}/favorite`);
  } catch (err) {
    throw err;
  }
};

export const toggleFavorite = (
  isFavorite: boolean | undefined,
  trainerId: string,
): Promise<{
  isFavorite: boolean;
  favoriteTotalCount: number;
}> => {
  try {
    if (isFavorite) {
      return instance.delete(`/trainers/${trainerId}/favorite`);
    }
    return instance.post(`/trainers/${trainerId}/favorite`);
  } catch (err) {
    throw err;
  }
};
