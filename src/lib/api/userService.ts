import instance from "./instance";
import { QueryFunctionContext } from "@tanstack/react-query";

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