import { useState } from "react";
import CardContainer from "@/components/Common/Card/CardContainer";
import Experience from "@/components/Common/Card/Experience";
import Favorite from "@/components/Common/Card/Favorite";
import LessonCount from "@/components/Common/Card/LessonCount";
import Rating from "@/components/Common/Card/Rating";

export default function Home() {
  const [isFavorited, setIsFavorited] = useState<boolean>(true);
  const favoriteCount = 10;

  return (
    <div className="flex bg-pink-200 m-10 p-10">
      <CardContainer>
        <Favorite isFavorited={isFavorited} favoriteCount={favoriteCount} />
        <Rating rating={4.9} reviewCount={120} />
        <Experience experience={7} />
        <LessonCount lessonCount={235} />
      </CardContainer>
    </div>
  );
}
