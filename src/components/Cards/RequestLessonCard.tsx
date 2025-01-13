import { ic_edit_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import formatDate from "@/lib/utils/formatDate";
import formatTime from "@/lib/utils/formatTime";
import { Lesson } from "@/types/lesson";
import { LessonType, LocationType, RequestType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import Button from "../Common/Button";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import { HorizontalLine } from "../Common/Line";
import ModalContainer from "../Modal/ModalContainer";
import RejectedRequest from "../Modal/RejectedRequest";
import SendQuote from "../Modal/SendQuote";

const info_wrap = clsx(
  "flex flex-col gap-4 px-0",
  "pc:gap-[2.4rem] pc:py-[1.6rem] pc:px-[1.8rem]",
  "tablet:py-[0.8rem] moblie:py-0",
);
const buttons = "flex gap-[1.1rem] pc:flex-row tablet:flex-row mobile:flex-col";
const button = "flex-1 gap-4 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold";

export default function RequestLessonCard({ item }: { item: Lesson }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState<boolean>(false);

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between items-center">
        <div className="flex gap-[1.2rem]">
          <ChipLessonType lessonType={item.lessonType as LessonType} size="lg" />
          <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />
        </div>
        <p className="text-gray-500 text-xs font-normal pc:text-md">{formatTime(item.createdAt)}</p>
      </div>
      <div className={info_wrap}>
        <p className="text-lg font-semibold pc:text-xl">고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo
          startDate={formatDate(item.startDate)}
          endDate={formatDate(item.endDate)}
          locationType={locationType_trans[item.locationType as LocationType]}
        />
      </div>
      <div className={buttons}>
        <Button
          onClick={() => setIsQuoteModalOpen(true)}
          className={`${button} text-gray-50 bg-blue-300`}
        >
          견적 보내기
          <Image src={ic_edit_md} width={24} height={24} alt="견적 보내기" />
        </Button>
        <Button
          onClick={() => setIsRejectedModalOpen(true)}
          className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}
        >
          반려
        </Button>
      </div>

      {isQuoteModalOpen && (
        <ModalContainer
          title="견적 보내기"
          buttonText="견적 보내기"
          closeModal={() => setIsQuoteModalOpen(false)}
        >
          <SendQuote />
        </ModalContainer>
      )}
      {isRejectedModalOpen && (
        <ModalContainer
          title="요청 반려"
          buttonText="반려하기"
          closeModal={() => setIsRejectedModalOpen(false)}
        >
          <RejectedRequest />
        </ModalContainer>
      )}
    </CardContainer>
  );
}
