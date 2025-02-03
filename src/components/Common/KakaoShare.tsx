import { Profile } from "@/types/trainer";
import { lessonType_trans } from "@/types/types";

interface kakaoTalkShareProps {
  trainerInfo: Profile["profile"];
}

export const kakaoTalkShare = ({ trainerInfo }: kakaoTalkShareProps) => {
  const lessonType = trainerInfo.lessonType.map((lesson) => {
    return lessonType_trans[lesson].ko;
  });
  const { Kakao, location } = window;
  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "맞춤형 트레이닝 서비스, 핏메이트",
      description: `${lessonType} 관련 레슨을 받고 싶으신가요? ${trainerInfo?.name} 강사님을 추천합니다. 핏메이트에서 확인해 보세요!`,
      imageUrl: "https://i.imgur.com/eFR67w5.png",
      link: {
        mobileWebUrl: location.href,
        webUrl: location.href,
      },
    },
  });
};
