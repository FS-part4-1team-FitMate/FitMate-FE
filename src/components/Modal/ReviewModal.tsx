import { ic_star_active_md, ic_star_inactive_md } from "@/imageExports";
import Image from "next/image";
import { useState } from "react";
import WriteReviewCard from "@/components/Cards/writeReviewCard";
import Textarea from "../Common/Textarea";
import ModalContainer from "./ModalContainer";

interface Review {
  id: number;
  name: string;
  date: string;
  price: string;
}

interface ReviewModalProps {
  review?: Review;
  closeModal: () => void;
}

export default function ReviewModal({ review, closeModal }: ReviewModalProps) {
  const [rating, setRating] = useState(0);

  return (
    <ModalContainer title="리뷰 쓰기" buttonText="리뷰 등록" closeModal={closeModal}>
      <WriteReviewCard item={review} />
      <p className="mt-8 text-lg font-semibold">평점을 선택해 주세요</p>

      <div className="flex gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={index < rating ? ic_star_active_md : ic_star_inactive_md}
            onClick={() => setRating(index + 1)}
            alt={`별점 ${index + 1}`}
          />
        ))}
      </div>

      <Textarea
        id="review"
        label="상세 후기를 작성해 주세요"
        placeholder="최소 10자 이상 입력해 주세요"
      />
    </ModalContainer>
  );
}
