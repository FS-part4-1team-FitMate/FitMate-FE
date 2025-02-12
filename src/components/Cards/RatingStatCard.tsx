import { ReviewStat } from "@/types/reviews";

interface Props {
  ratingStat: ReviewStat[];
}

function RatingStatCard({ ratingStat }: Props) {
  const ratingStatRev = ratingStat?.toReversed();
  const sum = ratingStatRev?.reduce((acc, val) => acc + val.count, 0);

  return (
    <div className="flex flex-col justify-normal items-center gap-[16px]">
      <div className="text-lg font-medium rounded-2xl w-[330px] max-w-full p-[10px]">
        {ratingStatRev?.map((val, idx) => (
          <div key={idx} className="flex justify-between items-center py-[5px] px-[8px] gap-[10px]">
            <div className="text-black-300 text-md font-medium text-left w-[30px] shrink-0 pc:text-xl">
              {val.rating}점
            </div>
            <div className="relative bg-bg-300 grow-1 shrink-1 w-[250px] h-[10px] rounded-full">
              <div
                className="absolute bg-yellow-100 left-0 top-0 bottom-0 rounded-full"
                style={{ width: `${(val.count / sum) * 100}%` }}
              ></div>
            </div>
            <div className="text-gray-300 text-md font-bold text-left w-[30px] shrink-0 pc:text-xl">
              {val.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingStatCard;
