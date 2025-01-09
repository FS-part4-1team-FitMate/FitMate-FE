interface Props {
  ratingStat: number[];
}

function RatingStatCard({ ratingStat }: Props) {
  const ratingStatRev = ratingStat.toReversed();
  const sum = ratingStatRev.reduce((acc, val) => acc + val, 0);

  return (
    <div className="flex flex-col justify-normal items-center mx-auto mb-[48px] gap-[16px]">
      <div className="text-lg font-medium bg-slate-200 rounded-2xl w-[330px] max-w-full p-[10px]">
        {ratingStatRev.map((count, idx) => {
          return (
            <div className="flex justify-between items-center py-[5px] px-[8px] gap-[10px]">
              <div className="text-left w-[30px] shrink-0">{5 - idx}점</div>
              <div className="relative bg-slate-400 grow-1 shrink-1 w-[250px] h-[10px] rounded-full">
                <div
                  className="absolute bg-yellow-500 left-0 top-0 bottom-0 rounded-full"
                  style={{ width: `${(count / sum) * 100}%` }}
                ></div>
              </div>
              <div className="text-left w-[30px] shrink-0">{count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RatingStatCard;
