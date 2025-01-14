import { ic_edit_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendQuote } from "@/lib/api/quoteService";
import formatDate from "@/lib/utils/formatDate";
import formatTime from "@/lib/utils/formatTime";
import { Lesson } from "@/types/lesson";
import { QuoteData } from "@/types/quote";
import { LessonType, LocationType, RequestType, locationType_trans } from "@/types/types";
import useQuoteValidate from "@/hooks/useQuoteValidate";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import Button from "../Common/Button";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import { HorizontalLine } from "../Common/Line";
import ModalContainer from "../Modal/ModalContainer";
import RejectedRequest from "../Modal/RejectedRequest";
import SendQuote from "../Modal/SendQuote";

export default function RequestLessonCard({ item }: { item: Lesson }) {
  const queryClient = useQueryClient();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState<boolean>(false);

  const { values, setValues, errors, setErrors, handleChange, validate, isInputEmpty } =
    useQuoteValidate({
      quote: "",
      message: "",
    });

  const [error, setError] = useState<string>("");

  const uploadQuote = useMutation({
    mutationFn: (quoteData: QuoteData) => sendQuote(quoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sendQuote"] });
      alert("견적을 전송하였습니다.");
      setIsQuoteModalOpen(false);
    },
    onError: (error: any) => {
      console.error("견적 전송에 실패하였습니다.", error.message);
      setError("견적 전송에 실패하였습니다.");
    },
  });

  const handleSendQuote = async () => {
    if (!validate()) {
      return;
    }

    const quoteData = {
      lessonRequestId: item.id,
      quote: parseInt(values.quote),
      message: values.message,
    };
    uploadQuote.mutate(quoteData);
  };

  const closeModal = () => {
    setIsQuoteModalOpen(false);
    setValues({
      quote: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between items-center">
        <div className="flex gap-[1.2rem]">
          <ChipLessonType lessonType={item.lessonType as LessonType} size="lg" />
          <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />
        </div>
        <p className="text-gray-500 text-xs font-normal pc:text-md">{formatTime(item.createdAt)}</p>
      </div>
      <div
        className={clsx(
          "flex flex-col gap-4 px-0 tablet:py-[0.8rem] moblie:py-0",
          "pc:gap-[2.4rem] pc:py-[1.6rem] pc:px-[1.8rem]",
        )}
      >
        <p className="text-lg font-semibold pc:text-xl">{item.name} 고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo
          startDate={formatDate(item.startDate)}
          endDate={formatDate(item.endDate)}
          locationType={locationType_trans[item.locationType as LocationType]}
        />
      </div>
      <div className="flex gap-[1.1rem] pc:flex-row tablet:flex-row mobile:flex-col">
        <Button
          onClick={() => setIsQuoteModalOpen(true)}
          className={`flex-1 gap-4 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold text-gray-50 bg-blue-300`}
        >
          견적 보내기
          <Image src={ic_edit_md} width={24} height={24} alt="견적 보내기" />
        </Button>
        <Button
          onClick={() => setIsRejectedModalOpen(true)}
          className={`flex-1 gap-4 h-[6.4rem] p-[1.6rem] rounded-[1.6rem] text-xl font-semibold border border-blue-300 text-blue-300 bg-gray-50`}
        >
          반려
        </Button>
      </div>

      {isQuoteModalOpen && (
        <ModalContainer
          title="견적 보내기"
          buttonText="견적 보내기"
          closeModal={closeModal}
          onButtonClick={handleSendQuote}
          isButtonEnabled={isInputEmpty()}
        >
          <SendQuote item={item} values={values} errors={errors} onInputChange={handleChange} />
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
