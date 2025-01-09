import StarPoints from "../Common/StarPoints";

interface Props {
  ratingAvg: number;
}

function RatingAvgCard({ ratingAvg }: Props) {
  return (
    <div className="flex flex-col justify-normal items-center mx-auto my-[48px] gap-[16px]">
      <div className="flex items-center">
        <span className="text-7xl font-semibold">{ratingAvg.toFixed(1)}&nbsp;</span>
        <span className="text-5xl text-slate-500">/ 5</span>
      </div>
      <StarPoints rating={ratingAvg / 5} r={16} r0={9} />
    </div>
  );
}

export default RatingAvgCard;
