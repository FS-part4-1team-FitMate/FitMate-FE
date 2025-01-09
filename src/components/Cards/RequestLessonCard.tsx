import clsx from "clsx";
import { useState } from "react";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import { HorizontalLine } from "../Common/Line";
import ModalContainer from "../Modal/ModalContainer";
import RejectedRequest from "../Modal/RejectedRequest";
import SendQuote from "../Modal/SendQuote";

const info_wrap = clsx(
  "flex flex-col",
  "pc:gap-[2.4rem] pc:py-[1.6rem] pc:px-[1.8rem]",
  "tablet:gap-4 tablet:py-[0.8rem] tablet:px-0",
  "mobile:gap-4 moblie:py-0 moblie:px-0",
);
const buttons = "flex gap-[1.1rem] pc:flex-row tablet:flex-row mobile:flex-col";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

/**
 *
 * @TODO replace any
 */

export default function RequestLessonCard({ item }: { item: any }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState<boolean>(false);

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">칩 넣을 자리</p>
        <p className="text-gray-500 font-normal pc:text-md tablet:text-xs mobile:text-xs">
          1시간 전
        </p>
      </div>
      <div className={info_wrap}>
        <p className="font-semibold pc:text-xl tablet:text-lg mobile:text-lg">{item.name} 고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo startDate="" endDate="" locationType="" />
      </div>
      <div className={buttons}>
        <button
          onClick={() => setIsQuoteModalOpen(true)}
          className={`${button} text-gray-50 bg-blue-300`}
        >
          견적 보내기
        </button>
        <button
          onClick={() => setIsRejectedModalOpen(true)}
          className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}
        >
          반려
        </button>
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
