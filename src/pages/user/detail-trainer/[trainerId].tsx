import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Card/Line";
import ShareSNS from "@/components/Common/ShareSNS";

export default function DetailTrainer() {
  return (
    <div className="flex justify-between max-w-[144rem] m-auto mt-[5.6rem]">
      <div className="flex flex-col gap-16">
        <FindTrainerCard item="" />
        <HorizontalLine />
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">상세설명</h1>
          <p className="text-2lg font-normal">description</p>
        </div>
        <HorizontalLine />
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">제공 서비스</h1>
          <p className="text-2lg font-normal">스포츠</p>
        </div>
        <HorizontalLine />
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">서비스 가능 지역</h1>
          <p className="text-2lg font-normal">서울</p>
        </div>
        <HorizontalLine />
        <div className="text-2xl font-bold">평점 및 리뷰 들어갈 부분</div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-xl font-semibold">김코드 강사님에게 지정 견적을 요청해보세요</h1>
          <button className="flex justify-center items-center w-[35.3rem] h-[5.4rem] p-4 border border-line-200 rounded-[1.6rem] text-xl font-semibold bg-gray-50">
            기사님 찜하기
          </button>
          <button className="flex justify-center items-center w-[35.3rem] h-[5.4rem] p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-blue-300">
            지정 견적 요청하기
          </button>
        </div>
        <ShareSNS label="나만 알기엔 아쉬운 강사님인가요?" />
      </div>
    </div>
  );
}
