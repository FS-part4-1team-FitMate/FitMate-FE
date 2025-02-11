import { useUser } from "@/contexts/UserProvider";
import { ic_like_active_sm, ic_like_inactive_sm } from "@/imageExports";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetFavoriteInfo } from "@/lib/api/queries/trainer";
import { getFavorite, toggleFavorite } from "@/lib/api/userService";

interface Props {
  trainerId: string;
  noneCount?: boolean;
}

function Favorite({ trainerId, noneCount = false }: Props) {
  const user = useUser();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);
  const [favoriteTotalCount, setFavoriteTotalCount] = useState<number | undefined>(0);
  const { data: favorite, isError } = useGetFavoriteInfo(trainerId);
  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleFavorite(favorite?.isFavorite, trainerId),
    onSuccess: (data) => {
      // setFavoriteTotalCount(data.favoriteTotalCount);
      // setIsFavorite(data.isFavorite);
      queryClient.invalidateQueries(["favorite", trainerId]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    setIsFavorite(favorite?.isFavorite);
    setFavoriteTotalCount(favorite?.favoriteTotalCount);
  }, [favorite]);

  return (
    <div
      className="inline-flex text-lg items-center gap-[5px] cursor-pointer"
      onClick={() => toggleLikeMutation.mutate()}
    >
      <Image
        src={isFavorite ? ic_like_active_sm : ic_like_inactive_sm}
        width={24}
        height={24}
        alt="isFavorite"
      />
      {noneCount ? "" : favoriteTotalCount || 0}
    </div>
  );
}

export default Favorite;
