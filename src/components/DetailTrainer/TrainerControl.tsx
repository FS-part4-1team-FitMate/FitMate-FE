import { useRouter } from "next/router";
import { useDirectQuote, useGetMyLessons } from "@/lib/api/queries/lesson";
import { Profile } from "@/types/types";
import Button from "../Common/Button";
import Favorite from "../Common/Favorite";

export default function TrainerControl({ profile }: { profile: Profile }) {
  const router = useRouter();

  const { data: myLessonList } = useGetMyLessons({ status: "PENDING" });

  const lessonId = myLessonList?.list[0]?.id;
  const trainerId = profile?.userId;

  const directQuote = useDirectQuote();

  const handleLessonRequest = () => {
    if (!lessonId || myLessonList.list.length === 0) {
      router.push("/user/create-request");
    } else {
      handleSendDirectQuote();
    }
  };

  const handleSendDirectQuote = async () => {
    if (lessonId && trainerId) {
      directQuote.mutate({ lessonId, trainerId: trainerId });
    }
  };

  return (
    <div className="flex flex-col gap-4 pc:gap-[3.2rem]">
      <h1 className="hidden text-xl font-semibold pc:block">
        {profile?.name} 강사님에게 지정 견적을 요청해보세요
      </h1>
      <div className="flex flex-row gap-[0.8rem] w-full p-4 pc:flex-col pc:gap-[3.2rem] pc:px-0">
        <Button className="hover:bg-red-100 hover:border hover:border-red-200 hover:text-red-200 h-[5.4rem] p-4 rounded-[1.6rem] font-semibold pc:w-[35.3rem] pc:text-xl hidden gap-4 border border-line-200 bg-gray-50 pc:flex">
          <Favorite trainerId={trainerId as string} noneCount={true} /> 강사님 찜하기
        </Button>
        <div className="flex justify-center items-center w-[5.4rem] h-[5.4rem] p-4 border border-line-200 rounded-[1.6rem] pc:hidden">
          <Favorite trainerId={trainerId as string} noneCount={true} />
        </div>
        <Button
          onClick={handleLessonRequest}
          className="hover:bg-blue-100 hover:border hover:border-blue-300 hover:text-blue-300 h-[5.4rem] p-4 rounded-[1.6rem] font-semibold w-full text-gray-50 bg-blue-300 pc:w-[35.3rem] pc:text-xl"
        >
          지정 견적 요청하기
        </Button>
      </div>
    </div>
  );
}
