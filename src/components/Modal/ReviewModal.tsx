import { ic_star_active_md, ic_star_inactive_md } from "@/imageExports";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "@/lib/api/ReviewService";
import LessonSummaryCard from "@/components/Cards/LessonSummaryCard";
import Textarea from "../Common/Textarea";
import ModalContainer from "./ModalContainer";
import { ReviewableList } from "@/types/reviews";

interface ReviewModalProps {
  review: ReviewableList;
  closeModal: () => void;
}

export default function ReviewModal({ review, closeModal }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(rating > 0 && content.trim().length >= 10);
  }, [rating, content]);

  const postMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      closeModal();
    },
  });

  const handleSubmit = () => {
    if (rating === 0 || content.trim().length < 10) {
      alert("별점과 최소 10자 이상의 텍스트를 입력하세요.");
      return;
    }

    const requestData = { lessonQuoteId: review.id, rating, content };
    console.log("서버에 보낼 데이터:", requestData);

    postMutation.mutate({ id: review.id, rating, content });
  };

  

  return (
    <ModalContainer
      title="리뷰 쓰기"
      buttonText={postMutation.isLoading ? "등록 중..." : "리뷰 등록"}
      closeModal={closeModal}
      onButtonClick={handleSubmit}
      isButtonEnabled={isButtonEnabled}
    >
      <LessonSummaryCard
        item={review}
      />
      <p className="text-lg font-semibold">평점을 선택해 주세요</p>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={index < rating ? ic_star_active_md : ic_star_inactive_md}
            width={36}
            height={36}
            onClick={() => setRating(index + 1)}
            alt={`별점 ${index + 1}`}
            className="cursor-pointer"
          />
        ))}
      </div>
      <Textarea
        id="review"
        label="상세 후기를 작성해 주세요"
        placeholder="최소 10자 이상 입력해 주세요"
        onChange={(e) => setContent(e.target.value)}
      />
    </ModalContainer>
  );
}
