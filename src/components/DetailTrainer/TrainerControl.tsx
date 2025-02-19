import { ic_chat } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createOrGetChatRoom } from "@/lib/api/chatService";
import { useDirectQuote, useGetMyLessons } from "@/lib/api/queries/lesson";
import { Profile } from "@/types/types";
import Button from "../Common/Button";
import Favorite from "../Common/Favorite";

export default function TrainerControl({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);

  const { data: myLessonList } = useGetMyLessons({ status: "PENDING" });

  const pendingLesson = myLessonList?.list[0];
  const isDirectQuote = pendingLesson?.directQuoteRequests ?? [];
  const lessonId = myLessonList?.list[0]?.id;
  const trainerId = profile?.userId;

  useEffect(() => {
    if (isDirectQuote.length >= 3) {
      setDisabled(true);
    }
  }, [isDirectQuote]);

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
      setDisabled(true);
    }
  };

  const handleChatRoom = async () => {
    if (!profile?.userId) {
      toast.error("강사 정보가 없습니다.");
      return;
    }

    try {
      const roomId = await createOrGetChatRoom(profile.userId);

      if (roomId) {
        router.push("/chat");
      } else {
        toast.error("채팅방을 생성할 수 없습니다.");
      }
    } catch (error) {
      console.error("🚨 채팅방 생성 실패:", error);
      toast.error("채팅방 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative flex flex-col gap-4 pc:gap-[3.2rem]">
      <h1 className="hidden text-xl font-semibold pc:block">
        {profile?.name} 강사님에게 지정 견적을 요청해보세요
      </h1>
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-4 flex flex-row gap-[0.8rem] max-w-[74.4rem] w-full px-8 pc:relative pc:flex-col pc:gap-[3.2rem] pc:px-0">
        <Button className="hover:bg-red-100 hover:border hover:border-red-200 hover:text-red-200 h-[5.4rem] p-4 rounded-[1.6rem] font-semibold pc:w-[35.3rem] pc:text-xl hidden gap-4 border border-line-200 bg-gray-50 shadow-card pc:flex">
          <Favorite trainerId={trainerId as string} noneCount={true} /> 강사님 찜하기
        </Button>
        <div className="hover:bg-red-100 hover:border hover:border-red-200 hover:text-red-200 flex justify-center items-center w-[5.4rem] h-[5.4rem] p-4 border border-line-200 rounded-[1.6rem] bg-white pc:hidden">
          <Favorite trainerId={trainerId as string} noneCount={true} />
        </div>
        <Button
          onClick={handleChatRoom}
          className="hover:bg-red-100 hover:border hover:border-red-200 hover:text-red-200 h-[5.4rem] p-4 rounded-[1.6rem] font-semibold pc:w-[35.3rem] pc:text-xl hidden gap-4 border border-line-200 bg-gray-50 shadow-card pc:flex"
        >
          문의하기
        </Button>
        <Image
          className="cursor-pointer border border-blue-300 rounded-[1.6rem] shadow-card block pc:hidden"
          onClick={handleChatRoom}
          src={ic_chat}
          width={54}
          height={54}
          alt="chat icon"
        />
        <Button
          onClick={handleLessonRequest}
          className={clsx(
            "h-[5.4rem] p-4 rounded-[1.6rem] font-semibold max-w-[50rem] w-full shadow-card pc:w-[35.3rem] pc:text-xl",
            disabled
              ? "bg-gray-300 text-white"
              : "hover:bg-blue-100 hover:border hover:border-blue-300 hover:text-blue-300 text-gray-50 bg-blue-300",
          )}
          disabled={disabled}
        >
          {disabled ? "견적 요청 완료" : "지정 견적 요청하기"}
        </Button>
      </div>
    </div>
  );
}
