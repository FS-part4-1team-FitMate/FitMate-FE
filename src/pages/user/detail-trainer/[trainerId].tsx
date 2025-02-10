import { img_non_review_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetRatingStat, useGetReviewList } from "@/lib/api/queries/review";
import { useGetFavoriteInfo, useGetTrainer } from "@/lib/api/queries/trainer";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import Pagination from "@/components/Common/Pagination";
import ShareSNS from "@/components/Common/ShareSNS";
import TrainerControl from "@/components/DetailTrainer/TrainerControl";
import TrainerInfo from "@/components/DetailTrainer/TrainerInfo";
import TrainerReview from "@/components/DetailTrainer/TrainerReview";

export default function DetailTrainer() {
  const router = useRouter();
  const { trainerId } = router.query;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;

  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useGetTrainer(trainerId as string);

  const { data: reviewStat } = useGetRatingStat(trainerId as string);

  const {
    data: reviewList,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = useGetReviewList(trainerId as string, currentPage, pageSize);

  const {
    data: favoriteInfo,
    isLoading: isFavoriteLoading,
    isError: isFavoriteError,
  } = useGetFavoriteInfo(trainerId as string);

  if (isTrainerLoading || isReviewLoading || isFavoriteLoading) return <Loading />;

  if (isTrainerError) return toast.error("트레이너 정보를 불러오는 중 에러가 발생했어요! 😢");
  if (isReviewError) return toast.error("리뷰 목록을 불러오는 중 에러가 발생했어요! 😢");
  if (isFavoriteError) return toast.error("좋아요 정보를 불러오는 중 에러가 발생했어요! 😢");

  const trainerInfo = trainer?.profile;
  const reviews = reviewList?.reviews || [];
  const totalCount = reviewList?.totalCount || 0;

  return (
    <div
      className={clsx(
        "relative flex flex-col justify-between gap-16 m-auto mt-[2.4rem] mb-16 px-8",
        "pc:flex-row pc:gap-0 pc:mt-[5.6rem] pc:max-w-[144rem]",
        "tablet:max-w-[74.4rem] mobile:max-w-auto",
      )}
    >
      <div className={"flex flex-col gap-[2.4rem] w-full pc:gap-16 pc:pr-[10rem]"}>
        <FindTrainerCard profile={trainerInfo} favoriteInfo={favoriteInfo} />
        <div className="flex flex-col gap-4 pc:hidden">
          <HorizontalLine width="100%" />
          <ShareSNS label="나만 알기엔 아쉬운 강사님인가요?" trainerInfo={trainerInfo} />
        </div>
        <HorizontalLine width="100%" />
        <TrainerInfo profile={trainerInfo} />
        <h1 className="text-black-400 text-lg font-bold pc:text-2xl">리뷰 ({totalCount})</h1>
        {totalCount === 0 ? (
          <div className="flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
            <Image src={img_non_review_md} alt="non-review" />
            <h1 className="text-gray-400 text-lg font-regular">아직 등록된 리뷰가 없어요!</h1>
          </div>
        ) : (
          <>
            <TrainerReview
              reviewList={reviews}
              reviewStat={reviewStat || []}
              totalCount={totalCount}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / pageSize)}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
      <div className="flex flex-col gap-[2.4rem] pc:gap-16">
        <TrainerControl profile={trainerInfo} />
        <div className="hidden flex-col gap-16 pc:flex">
          <HorizontalLine width="100%" />
          <ShareSNS label="나만 알기엔 아쉬운 강사님인가요?" trainerInfo={trainerInfo} />
        </div>
      </div>
    </div>
  );
}
