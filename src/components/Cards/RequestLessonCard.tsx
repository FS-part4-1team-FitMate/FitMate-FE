import clsx from "clsx";
import { useState } from "react";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import { HorizontalLine } from "../Common/Line";
import ModalContainer from "../Modal/ModalContainer";
import SendQuote from "../Modal/SendQuote";

const buttons = "flex gap-[1.1rem]";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

/**
 *
 * @TODO replace any
 */

export default function RequestLessonCard({ item }: { item: any }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CardContainer width="95.5rem" gap="1.6rem">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">칩 넣을 자리</p>
        <p className="text-gray-500 text-xs font-normal">1시간 전</p>
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{item.name} 고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo startDate="" endDate="" locationType="" />
      </div>
      <QuotePrice price={180000} />
      <div className={buttons}>
        <button onClick={openModal} className={`${button} text-gray-50 bg-blue-300`}>
          견적 보내기
        </button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          반려
        </button>
      </div>
      {isModalOpen && (
        <ModalContainer title="견적 보내기" buttonText="견적 보내기" closeModal={closeModal}>
          <SendQuote />
        </ModalContainer>
      )}
    </CardContainer>
  );
}
