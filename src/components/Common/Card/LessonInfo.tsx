import { VerticalLine } from "../Line";

interface LessonInfoProps {
  startDate: string;
  endDate: string;
  locationType: string;
  address?: string;
}

export default function LessonInfo({ startDate, endDate, locationType, address }: LessonInfoProps) {
  const getLocation = () => {
    if (locationType === "오프라인") {
      return address;
    } else {
      return locationType;
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-[1.4rem] pc:gap-[1.6rem]">
      <div className="flex items-center gap-[1.4rem] pc:flex-row tablet:flex-row mobile:flex-col">
        <div className="flex items-center gap-[0.8rem] text-md font-medium pc:gap-[1.6rem] pc:text-2lg">
          <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
            <p className="text-nowrap text-gray-500 text-md font-medium pc:text-2lg">레슨 시작일</p>
          </div>
          <p>{startDate}</p>
        </div>
        <div className="pc:block tablet:hidden mobile:hidden">
          <VerticalLine height="1.5rem" />
        </div>
        <div className="flex items-center gap-[0.8rem] text-md font-medium pc:gap-[1.6rem] pc:text-2lg">
          <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
            <p className="text-nowrap text-gray-500 text-md font-medium pc:text-2lg">레슨 종료일</p>
          </div>
          <p>{endDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-[0.8rem] text-md font-medium pc:gap-[1.6rem] pc:text-2lg">
        <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
          <p className="text-nowrap text-gray-500 text-md font-medium pc:text-2lg">레슨 장소</p>
        </div>
        <p>{getLocation()}</p>
      </div>
    </div>
  );
}
