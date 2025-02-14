import { ReviewableList } from "@/types/reviews";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import LessonInfo from "../Common/Card/LessonInfo";
import formatDate from "@/lib/utils/formatDate";
import { locationType_trans } from "@/types/types";
import Image from "next/image";
import { ic_profile_default_md } from "@/imageExports";

interface Props {
  item: ReviewableList;
}

export default function LessonSummaryCard({ item }: Props) {
  const { lessonRequest } = item;
  console.log(lessonRequest)
  return (
    <CardContainer width="100%" gap="2.4rem">
        <div className="text-md font-medium pc:text-2lg flex justify-between items-center gap-4">
            <Image
                src={ic_profile_default_md}
                objectFit="contain"
                width={56}
                height={56}
                alt="프로필 사진"
            />
            <h2 className="text-md font-medium pc:text-2lg">{item.trainerId} 강사님</h2>
        </div>
            <LessonInfo
                startDate={formatDate(lessonRequest?.startDate)}
                endDate={formatDate(lessonRequest?.endDate)}
                address={lessonRequest?.roadAddress}
                locationType={locationType_trans[lessonRequest?.locationType]}
            />
    </CardContainer>
    
  );
}