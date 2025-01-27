import clsx from "clsx";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrainerInfo } from "@/lib/api/trainerService";
import { getFavorite } from "@/lib/api/userService";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import Pagination from "@/components/Common/Pagination";
import ShareSNS from "@/components/Common/ShareSNS";
import TrainerControl from "@/components/DetailTrainer/TrainerControl";
import TrainerInfo from "@/components/DetailTrainer/TrainerInfo";
import TrainerReview from "@/components/DetailTrainer/TrainerReview";

interface Params extends ParsedUrlQuery {
  trainerId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { trainerId } = context.params as Params;

  if (!trainerId) {
    return {
      props: {
        trainerId: null,
      },
    };
  }

  return {
    props: {
      trainerId,
    },
  };
};

export default function DetailTrainer({ trainerId }: { trainerId: string | null }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, isError } = useQuery(
    ["trainer-detail", trainerId],
    () => getTrainerInfo(trainerId as string),
    {
      enabled: !!trainerId,
    },
  );

  const {
    data: favoriteInfo,
    isLoading: isFavoriteLoading,
    isError: isFavoriteError,
  } = useQuery(["favorite"], () => getFavorite(trainerId as string), { enabled: !!trainerId });

  if (isError || isFavoriteError) return <div>error!!</div>;

  const trainerInfo = data?.profile ?? {};

  return (
    <div
      className={clsx(
        "relative flex flex-col justify-between gap-16 m-auto mt-[2.4rem] mb-16 px-8",
        "pc:flex-row pc:gap-0 pc:mt-[5.6rem] pc:max-w-[144rem]",
        "tablet:max-w-[74.4rem] mobile:max-w-[37.5rem]",
      )}
    >
      <div className={"flex flex-col gap-[2.4rem] w-full pc:gap-16 pc:pr-[10rem]"}>
        <FindTrainerCard profile={trainerInfo} favoriteInfo={favoriteInfo} />
        <div className="flex flex-col gap-4 pc:hidden">
          <HorizontalLine width="100%" />
          <ShareSNS label="나만 알기엔 아쉬운 강사님인가요?" />
        </div>
        <HorizontalLine width="100%" />
        <TrainerInfo profile={trainerInfo} />
        {/* 리뷰 리스트 api 연결해야함 */}
        <TrainerReview reviewList={trainerInfo} />
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
      </div>
      <div className="flex flex-col gap-[2.4rem] pc:gap-16">
        <TrainerControl profile={trainerInfo} />
        <div className="hidden flex-col gap-16 pc:flex">
          <HorizontalLine width="100%" />
          <ShareSNS label="나만 알기엔 아쉬운 강사님인가요?" />
        </div>
      </div>
      {isLoading || (isFavoriteLoading && <Loading />)}
    </div>
  );
}
