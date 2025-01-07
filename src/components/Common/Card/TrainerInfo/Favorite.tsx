import { ic_like_active_md, ic_like_inactive_md } from "@/imageExports";
import Image from "next/image";

interface FavoriteProps {
  isFavorited?: boolean;
  favoriteCount?: number;
}

export default function Favorite({ isFavorited, favoriteCount }: FavoriteProps) {
  return (
    <div className="flex items-center gap-[0.4rem]">
      <Image
        src={isFavorited ? ic_like_active_md : ic_like_inactive_md}
        width={24}
        height={24}
        alt="좋아요"
      />
      <p className="text-2lg font-medium">{favoriteCount}</p>
    </div>
  );
}
