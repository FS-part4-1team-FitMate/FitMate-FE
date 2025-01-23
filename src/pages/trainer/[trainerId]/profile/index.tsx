import { useUser } from "@/contexts/UserProvider";
import { ic_edit_sm, ic_profile_default_md, img_default_md } from "@/imageExports";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/lib/api/ReviewService";
import { getProfile } from "@/lib/api/authService";
import { region_trans } from "@/types/types";
import RatingAvgCard from "@/components/Cards/RatingAvgCard";
import RatingStatCard from "@/components/Cards/RatingStatCard";
import ReviewCard from "@/components/Cards/ReviewCard";
import ChipLessonType from "@/components/Chip/ChipLessonType";
import Button from "@/components/Common/Button";
import Experience from "@/components/Common/Card/TrainerInfo/Experience";
import LessonCount from "@/components/Common/Card/TrainerInfo/LessonCount";
import Rating from "@/components/Common/Card/TrainerInfo/Rating";
import { HorizontalLine, VerticalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import Pagination from "@/components/Common/Pagination";

let setTimeoutId: NodeJS.Timeout;

function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { trainerId } = router.query;
  const user = useUser();
  const myPage = trainerId === user?.id;
  const {
    data: trainerProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", trainerId],
    queryFn: () => getProfile(trainerId as string),
    cacheTime: 60 * 60 * 1000,
    staleTime: 60 * 60 * 1000,
    enabled: !!trainerId,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: reviews } = useQuery({
    queryKey: ["reviews", trainerId, { page, limit }],
    queryFn: () => getReviews(trainerId as string, { page, limit }),
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    enabled: !!trainerId,
  });
  // console.log(reviews);

  useEffect(() => {
    const handleSearchChange = () => {
      const { pathname, search } = window.location;
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get("page");
      if (pageParam) {
        setPage(Number(pageParam)); // 페이지 번호를 상태로 설정
      }
      router.replace(pathname + search);
    };

    // 초기 실행
    handleSearchChange();

    // URL 검색 변화를 감지
    window.addEventListener("popstate", handleSearchChange);

    return () => {
      window.removeEventListener("popstate", handleSearchChange);
    };
  }, []);

  useEffect(() => {
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => {
      window.history.pushState({}, "", `${window.location.pathname}?page=${page}`);
    }, 1024);
  }, [page]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div className="text-2lg text-center">오류 발생!</div>;
  }

  // TODO: || "채우기 용" 지우기.
  return (
    <main className="flex flex-col justify-normal items-start gap-[16px] w-full max-w-[800px] mx-auto p-[12px]">
      {myPage ? (
        <h1 className="text-xl font-semibold">마이 페이지</h1>
      ) : (
        <h1 className="text-xl font-semibold">강사님 페이지</h1>
      )}
      <HorizontalLine width="100%" />
      <div className="flex flex-col justify-normal items-start p-[12px] bg-slate-100 w-full">
        <div className="flex gap-[16px] mb-[12px]">
          <Image
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
            <div className="text-lg">{trainerProfile?.profile?.name || "김코드"}</div>
            <div className="text-md text-slate-500 truncate whitespace-nowrap">
              {trainerProfile?.profile?.intro || "한 줄 자기소개가 들어갑니다."}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] bg-white p-[10px] w-full">
          <div className="flex gap-[8px] justify-normal items-center">
            <Rating
              rating={trainerProfile?.profile?.rating}
              reviewCount={trainerProfile?.profile?.reviewCount}
            />
            <VerticalLine height="16px" />
            <Experience experience={trainerProfile?.profile?.experience} />
            <VerticalLine height="16px" />
            <LessonCount lessonCount={trainerProfile?.profile?.lessonCount} />
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="text-lg bg-slate-100 inline-block p-[2px]">제공 강의</div>
            <div className="text-lg flex justify-normal items-center gap-[5px]">
              {trainerProfile?.profile?.lessonType.map((lessonType) => {
                return <ChipLessonType lessonType={lessonType} size="lg" />;
              })}
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="text-lg bg-slate-100 inline-block p-[2px]">지역</div>
            <div className="text-lg">
              {trainerProfile?.profile?.region.map((region) => region_trans[region]).join(", ")}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-normal items-start p-[12px] bg-slate-100 w-full">
        <div className="text-lg font-semibold">자격증</div>
        <Image
          src={
            trainerProfile?.certificationPresignedUrl
              ? trainerProfile.certificationPresignedUrl
              : img_default_md
          }
          alt="자격증"
          width={300}
          height={400}
          className="object-contain my-[10px]"
        />
      </div>
      {myPage && (
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white"
          onClick={() => {
            router.push(`/trainer/${user?.id}/profile/edit`);
          }}
        >
          내 프로필 수정 <Image src={ic_edit_sm} width={24} height={24} alt="Edit" />
        </Button>
      )}
      <HorizontalLine width="100%" />
      <div className="text-xl font-semibold">리뷰 ({trainerProfile?.profile?.reviewCount})</div>
      <div className="tablet:flex tablet:flex-row tablet:justify-center tablet:gap-[50px] mx-auto max-w-full">
        <RatingAvgCard ratingAvg={trainerProfile?.profile?.rating as number} />
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
      <div className="text-2lg flex justify-center items-center mx-auto my-[24px] gap-[16px]">
        <Pagination
          currentPage={page}
          totalPages={reviews?.totalCount || 10}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}

export default Profile;
