import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDirectQuote, getMyLessonRequest } from "@/lib/api/lessonService";
import { MyLessonResult } from "@/types/lesson";
import { Profile } from "@/types/types";
import Button from "../Common/Button";
import Favorite from "../Common/Favorite";

export default function TrainerControl({ profile }: { profile: Profile }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: myLessonList } = useQuery<MyLessonResult>(
    ["my-lesson", { page: 1, status: "PENDING" }],
    () => getMyLessonRequest({ page: 1, status: "PENDING" }),
  );

  const lessonId = myLessonList?.list[0]?.id;
  const trainerId = profile?.userId;

  const directQuote = useMutation({
    mutationFn: ({ lessonId, trainerId }: { lessonId: string; trainerId: string }) =>
      createDirectQuote(lessonId, trainerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["direct-quote"] });
      toast.success("지정 견적을 요청하였습니다.");
    },
    onError: (error: any) => {
      console.error("견적 요청에 실패하였습니다.", error.message);
      toast.error("견적 요청에 실패하였습니다.");
    },
  });

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
        <Button className="h-[5.4rem] p-4 rounded-[1.6rem] font-semibold pc:w-[35.3rem] pc:text-xl hidden gap-4 border border-line-200 bg-gray-50 pc:flex">
          <Favorite trainerId={trainerId} noneCount={true} /> 강사님 찜하기
        </Button>
        <div className="flex justify-center items-center w-[5.4rem] h-[5.4rem] p-4 border border-line-200 rounded-[1.6rem] pc:hidden">
          <Favorite trainerId={trainerId} noneCount={true} />
        </div>
        <Button
          onClick={handleLessonRequest}
          className="h-[5.4rem] p-4 rounded-[1.6rem] font-semibold pc:w-[35.3rem] pc:text-xl w-full text-gray-50 bg-blue-300"
        >
          지정 견적 요청하기
        </Button>
      </div>
    </div>
  );
}
