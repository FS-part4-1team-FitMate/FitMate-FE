import clsx from "clsx";
import formatDate from "@/lib/utils/formatDate";
import { Lesson } from "@/types/lesson";
import { LocationType, locationType_trans } from "@/types/types";
import { VerticalLine } from "../Common/Line";

const user_card = clsx(
  "flex flex-col gap-[0.6rem] py-4 rounded-[0.8rem]",
  "pc:gap-[1.6rem] pc:py-[2.4rem] pc:px-[1.8rem] pc:border pc:border-line-100 pc:shadow-card",
);

export default function UserCard({ item }: { item: Lesson }) {
  const getLocation = () => {
    if (item.locationType === "OFFLINE") {
      return item.roadAddress;
    } else {
      return locationType_trans[item.locationType as LocationType];
    }
  };
  return (
    <div className={user_card}>
      <p className="text-md font-semibold pc:text-2lg">{item.user.profile.name} 고객님</p>
      <div className="flex flex-col gap-[0.8rem] pc:gap-[1.4rem]">
        <div className="flex items-center gap-[0.8rem] pc:gap-[1.6rem]">
          <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
            <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 장소</p>
          </div>
          <p className="text-black-300 text-md font-medium pc:text-2lg">{getLocation()}</p>
        </div>
        <div className="flex items-center gap-[1.4rem] pc:gap-[1.6rem]">
          <div className="flex items-center gap-[0.8rem] pc:gap-[1.6rem]">
            <div className="w-fit py-[0.4rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
              <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 시작일</p>
            </div>
            <p className="text-black-300 text-md font-medium pc:text-2lg">
              {formatDate(item.startDate)}
            </p>
          </div>
          <VerticalLine height="1.5rem" />
          <div className="flex items-center gap-[0.8rem] pc:gap-[1.6rem]">
            <div className="w-fit py-[0.4rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
              <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 종료일</p>
            </div>
            <p className="text-black-300 text-md font-medium pc:text-2lg">
              {formatDate(item.endDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
