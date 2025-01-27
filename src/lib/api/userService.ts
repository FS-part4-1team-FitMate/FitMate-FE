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

export const getFavorite = async (
  trainerId: string,
): Promise<{
  isFavorite: boolean;
  favoriteTotalCount: number;
}> => {
  try {
    const result = await instance.get(`/trainers/${trainerId}/favorite`);
    return result.data;
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
      return (await instance.delete(`/trainers/${trainerId}/favorite`)).data;
    }
    return (await instance.post(`/trainers/${trainerId}/favorite`)).data;
  } catch (err) {
    throw err;
  }
};
