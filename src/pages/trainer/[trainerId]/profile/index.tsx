import { useUser } from "@/contexts/UserProvider";
import { ic_edit_sm, ic_profile_default_md } from "@/imageExports";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrainerDetails } from "@/lib/api/authService";
import RatingAvgCard from "@/components/Cards/RatingAvgCard";
import RatingStatCard from "@/components/Cards/RatingStatCard";
import ReviewCard from "@/components/Cards/ReviewCard";
import Button from "@/components/Common/Button";
import Experience from "@/components/Common/Card/TrainerInfo/Experience";
import LessonCount from "@/components/Common/Card/TrainerInfo/LessonCount";
import Rating from "@/components/Common/Card/TrainerInfo/Rating";
import { HorizontalLine, VerticalLine } from "@/components/Common/Line";
import StarPoints from "@/components/Common/StarPoints";

function Profile() {
  const router = useRouter();
  const { trainerId } = router.query;
  const user = useUser();
  const myPage = trainerId === user?.id;
  const { data: trainerProfile, isError } = useQuery({
    queryKey: ["trainerProfile", trainerId],
    queryFn: () => getTrainerDetails(trainerId as string),
    staleTime: 5 * 60 * 1000,
  });
  const [rating, setRating] = useState(5.0);
  const [reviewCount, setReviewCount] = useState(100);
  const [lessonCount, setLessonCount] = useState(100);
  const [experience, setExperience] = useState(1.5);

  // TODO: || "채우기 용" 지우기.
  return (
    <main className="flex flex-col justify-normal items-start gap-[16px] w-full max-w-[800px] mx-auto p-[12px]">
      {myPage ? (
        <h1 className="text-xl font-semibold">마이페이지</h1>
      ) : (
        <h1 className="text-xl font-semibold">강사님 페이지</h1>
      )}
      <HorizontalLine width="100%" />
      <div className="flex flex-col justify-normal items-start p-[12px] bg-slate-100 w-full">
        <div className="flex gap-[16px] mb-[12px]">
          <Image
            src={trainerProfile?.profileImage ? trainerProfile.profileImage : ic_profile_default_md}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full border-[2px] border-solid border-slate-800"
          />
          <div className="flex flex-col justify-between items-start">
            <div className="text-lg">{trainerProfile?.name || "김코드"}</div>
            <div className="text-md text-slate-500 truncate whitespace-nowrap">
              {trainerProfile?.intro || "한 줄 자기소개가 들어갑니다."}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] bg-white p-[10px] w-full">
          <div className="flex gap-[8px] justify-normal items-center">
            <Rating rating={rating} reviewCount={reviewCount} />
            <VerticalLine height="16px" />
            <Experience experience={experience} />
            <VerticalLine height="16px" />
            <LessonCount lessonCount={lessonCount} />
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="text-lg bg-slate-100 inline-block p-[2px]">제공 강의</div>
            <div className="text-lg">스포츠, 피트니스</div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="text-lg bg-slate-100 inline-block p-[2px]">지역</div>
            <div className="text-lg">
              <s className="text-slate-400">온라인</s>, 서울, 경기
            </div>
          </div>
        </div>
      </div>
      {myPage && (
        <Button type="submit" className="w-full bg-blue-500 text-white disabled:bg-slate-600">
          내 프로필 수정 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
        </Button>
      )}
      <HorizontalLine width="100%" />
      <div className="text-xl font-semibold">리뷰 (100)</div>
      <div className="tablet:flex tablet:flex-row tablet:justify-center tablet:gap-[50px] mx-auto max-w-full">
        <RatingAvgCard ratingAvg={4.3} />
        <RatingStatCard ratingStat={[100, 0, 0, 0, 120]} />
      </div>
      <div className="flex flex-col gap-[24px]">
        <ReviewCard
          rating={4}
          nickname="kipid"
          createdAt="2025-01-09"
          content={"기초부터 차근차근 잘 가르쳐 주십니다.\n\n짱입니다요."}
        />
      </div>
    </main>
  );
}

export default Profile;
