import { ic_star_active_md, ic_star_inactive_md } from "@/imageExports";
import Image from "next/image";
import { useState } from "react";
import SimpleCard from "../Cards/writeReviewCard";
import Textarea from "../Common/Textarea";
import ModalContainer from "./ModalContainer";

export default function ReviewModal() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContainer title="리뷰 쓰기" buttonText="리뷰 등록" closeModal={closeModal}>
      <SimpleCard />

      <p className="mt-8 text-lg font-semibold">평점을 선택해 주세요</p>
      <div className="flex gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={index < rating ? ic_star_active_md : ic_star_inactive_md}
            width={36}
            height={36}
            onClick={() => handleStarClick(index)}
            alt={`별점 ${index + 1}`}
            className="cursor-pointer"
          />
        ))}
      </div>

      <Textarea
        id="review"
        label="상세 후기를 작성해 주세요"
        placeholder="최소 10자 이상 입력해 주세요"
        className="mt-4"
      />
    </ModalContainer>
  );
}
