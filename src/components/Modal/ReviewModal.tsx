import { ic_star_active_md, ic_star_inactive_md } from "@/imageExports";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchReview, postReview } from "@/lib/api/ReviewService";
import { ReviewItem } from "@/types/reviews";
import WriteReviewCard from "@/components/Cards/writeReviewCard";
import Textarea from "../Common/Textarea";
import ModalContainer from "./ModalContainer";

interface ReviewModalProps {
  review: ReviewItem;
  closeModal: () => void;
}

export default function ReviewModal({ review, closeModal }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      closeModal();
    },
  });
  const patchMutation = useMutation({
    mutationFn: patchReview,
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

    patchMutation.mutate({ id: review.id, rating, content });
  };

  return (
    <ModalContainer
      title="리뷰 쓰기"
      buttonText={patchMutation.isLoading ? "등록 중..." : "리뷰 등록"}
      closeModal={closeModal}
      onButtonClick={handleSubmit}
    >
      <WriteReviewCard
        item={review}
        onClick={() => postMutation.mutate({ id: review.id, rating, content })}
      />
      <p className="mt-8 text-lg font-semibold">평점을 선택해 주세요</p>

      <div className="flex gap-2 mb-4">
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
