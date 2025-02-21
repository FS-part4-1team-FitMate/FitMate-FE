import { useUser } from "@/contexts/UserProvider";
import {
  ic_edit_sm,
  ic_gender_female,
  ic_gender_male,
  ic_profile_default_md,
  img_default_md,
} from "@/imageExports";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetRatingStat, useGetReviewList } from "@/lib/api/queries/review";
import { useGetTrainer } from "@/lib/api/queries/trainer";
import { calcAvgRating } from "@/lib/utils/calcAvgRating";
import formatDate from "@/lib/utils/formatDate";
import { Gender, lessonType_trans, region_trans } from "@/types/types";
import RatingAvgCard from "@/components/Cards/RatingAvgCard";
import RatingStatCard from "@/components/Cards/RatingStatCard";
import ReviewCard from "@/components/Cards/ReviewCard";
import Button from "@/components/Common/Button";
import Experience from "@/components/Common/Card/TrainerInfo/Experience";
import LessonCount from "@/components/Common/Card/TrainerInfo/LessonCount";
import Rating from "@/components/Common/Card/TrainerInfo/Rating";
import Favorite from "@/components/Common/Favorite";
import { HorizontalLine, VerticalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import Pagination from "@/components/Common/Pagination";

interface QueryParams {
  page?: number;
  trainerId?: string;
}

interface PageProps {
  initialQuery: QueryParams;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { page = 1, trainerId = "" } = context.query;

  return {
    props: {
      initialQuery: {
        page: Number(page),
        trainerId: trainerId as string,
      },
    },
  };
};

function Profile({ initialQuery }: PageProps) {
  const router = useRouter();
  const { query } = router;
  const { trainerId } = query;
  const user = useUser();
  const myPage = trainerId === user?.id;
  const [page, setPage] = useState(Number(initialQuery.page) || 1);
  const limit = 5;
  const { data: reviews } = useGetReviewList(trainerId as string, page, limit);
  const { data: trainerProfile, isLoading, isError } = useGetTrainer(trainerId as string);
  const [avgRating, setAvgRating] = useState(0);
  const { data: reviewStat } = useGetRatingStat(trainerId as string);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { trainerId, page },
    });
  }, [trainerId, page]);

  useEffect(() => {
    setPage(Number(query.page) || 1);
  }, [query]);

  useEffect(() => {
    if (reviewStat) {
      setAvgRating(calcAvgRating(reviewStat));
    }
  }, [reviewStat]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div className="text-2lg text-center">오류 발생!</div>;
  }

  return (
    <main className="flex flex-col justify-normal items-start gap-[16px] w-full max-w-[800px] mx-auto p-[12px]">
      <Head>
        <title>{trainerProfile?.profile?.name} 강사님 페이지</title>
      </Head>
      <h1 className="text-xl font-semibold">{myPage ? "마이 페이지" : "강사님 페이지"}</h1>
      <HorizontalLine width="100%" />
      <div className="flex flex-col justify-normal items-start p-[12px] rounded-[2rem] bg-slate-100 w-full shadow-card">
        <p className="w-fit mt-2 mb-4 px-4 border border-blue-300 rounded-full text-blue-300 text-lg font-bold bg-blue-100">
          기본 정보
        </p>
        <div className="flex gap-[16px] mb-[12px]">
          <img
            src={
              trainerProfile?.profileImagePresignedUrl
                ? trainerProfile.profileImagePresignedUrl
                : ic_profile_default_md
            }
            alt="Profile"
            width={50}
            height={50}
            className="object-cover rounded-full border-[2px] border-solid border-slate-800 w-[50px] h-[50px]"
          />
          <div className="flex flex-col justify-between items-start">
            <div className="flex items-center gap-1">
              <p className="text-lg">{trainerProfile?.profile?.name}</p>
              <Image
                src={
                  trainerProfile?.profile?.gender === Gender.MALE
                    ? ic_gender_male
                    : ic_gender_female
                }
                width={15}
                height={15}
                alt="gender"
              />
            </div>
            <div className="text-md text-slate-500 truncate whitespace-nowrap">
              {trainerProfile?.profile?.intro}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] bg-white p-[10px] w-full rounded-[2rem]">
          <div className="flex gap-[8px] justify-normal items-center">
            <Rating rating={avgRating} reviewCount={trainerProfile?.profile?.reviewCount} />
            <VerticalLine height="16px" />
            <Experience experience={trainerProfile?.profile?.experience || 0} />
            <VerticalLine height="16px" />
            <LessonCount lessonCount={trainerProfile?.profile?.lessonCount || 0} />
            <VerticalLine height="16px" />
            <Favorite trainerId={trainerId as string} />
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap items-center gap-[12px]">
              <div className="rounded-lg text-gray-400 text-md font-semibold bg-bg-200 inline-block py-[1px] px-4 shadow-inner">
                제공 강의
              </div>
              <div className="text-md flex justify-normal items-center gap-[5px]">
                {trainerProfile?.profile?.lessonType.map((lessonType, idx) => {
                  return (
                    <p
                      key={idx}
                      className="py-[1px] px-4 border border-blue-300 rounded-full bg-blue-100 text-blue-300 text-sm"
                    >
                      {lessonType_trans[lessonType].ko}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="hidden pc:block tablet:block">
              <VerticalLine height="1.6rem" />
            </div>
            <div className="flex flex-wrap items-center gap-[12px]">
              <div className="rounded-lg text-gray-400 text-md font-semibold bg-bg-200 inline-block py-[1px] px-4 shadow-inner">
                지역
              </div>
              <div className="text-md">
                {trainerProfile?.profile?.region.map((region) => region_trans[region]).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-normal items-start p-[12px] rounded-[2rem] bg-slate-100 w-full shadow-card">
        <div className="w-fit my-4 px-4 border border-blue-300 rounded-full text-blue-300 text-lg font-bold bg-blue-100">
          자격증
        </div>
        <img
          src={
            trainerProfile?.certificationPresignedUrl
              ? trainerProfile.certificationPresignedUrl
              : img_default_md
          }
          alt="자격증"
          width={300}
          height={400}
          className="object-contain my-[10px] rounded-[2rem]"
        />
      </div>
      {myPage && (
        <Button
          type="submit"
          className="hover:bg-blue-200 gap-4 w-full bg-blue-500 text-white"
          onClick={() => {
            router.push(`/trainer/${user?.id}/profile/edit`);
          }}
        >
          내 프로필 수정 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
        </Button>
      )}
      <HorizontalLine width="100%" />
      <div className="text-xl font-semibold">리뷰 ({trainerProfile?.profile?.reviewCount})</div>
      <div className="flex flex-col items-center justify-center gap-[4rem] mx-auto w-full p-8 rounded-[3rem] bg-[#F7F7F7] pc:flex-row">
        <RatingAvgCard ratingAvg={avgRating} />
        <RatingStatCard ratingStat={reviewStat!} />
      </div>
      <div className="flex flex-col gap-[24px]">
        {reviews?.reviews.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              rating={review.rating}
              nickname={review.user.nickname}
              createdAt={formatDate(review.createdAt)}
              content={review.content}
            />
          );
        })}
      </div>
      <div className="text-2lg flex justify-center items-center mx-auto my-[24px] gap-[16px]">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(reviews?.totalCount! / limit) || 1}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}

export default Profile;
