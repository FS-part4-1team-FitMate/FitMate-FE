import { ic_profile_default_md } from "@/imageExports";
import Image from "next/image";
import formatDate from "@/lib/utils/formatDate";
import { ReviewableList } from "@/types/reviews";
import { locationType_trans } from "@/types/types";
import Button from "../Common/Button";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";

interface Props {
  item: ReviewableList;
  onClick: () => void;
}

export default function WriteReviewCard({ item, onClick }: Props) {
  const { lessonRequest } = item;
  return (
    <CardContainer width="100%" gap="2.4rem">
      <div className="flex items-center gap-8">
        <Image
          src={ic_profile_default_md}
          objectFit="contain"
          width={56}
          height={56}
          alt="프로필 사진"
        />
        <h2 className="text-lg font-medium pc:text-xl">{item.trainer.profile.name} 강사님</h2>
      </div>
      <LessonInfo
        startDate={formatDate(lessonRequest?.startDate)}
        endDate={formatDate(lessonRequest?.endDate)}
        address={lessonRequest?.roadAddress}
        locationType={locationType_trans[lessonRequest?.locationType]}
      />
      <Button onClick={onClick} className="bg-blue-500 text-white hover:bg-blue-600 transition">
        리뷰 작성하기
      </Button>
    </CardContainer>
  );
}
