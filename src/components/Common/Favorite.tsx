import { ic_like_active_sm, ic_like_inactive_sm } from "@/imageExports";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorite, toggleFavorite } from "@/lib/api/userService";

interface Props {
  trainerId: string;
}

function Favorite({ trainerId }: Props) {
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);
  const [favoriteTotalCount, setFavoriteTotalCount] = useState<number | undefined>(100);
  const { data: favorite, isError } = useQuery({
    queryKey: ["favorite", trainerId],
    queryFn: () => getFavorite(trainerId),
    staleTime: 5 * 60 * 1000,
  });
  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleFavorite(favorite?.isFavorite, trainerId),
    onSuccess: (data) => {
      setFavoriteTotalCount(data.favoriteTotalCount);
      setIsFavorite(data.isFavorite);
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
    <div className="inline-flex text-lg gap-[10px]">
      <Image
        src={isFavorite ? ic_like_active_sm : ic_like_inactive_sm}
        width={24}
        height={24}
        alt="isFavorite"
      />
      &nbsp;{favoriteTotalCount}
    </div>
  );
}

export default Favorite;
