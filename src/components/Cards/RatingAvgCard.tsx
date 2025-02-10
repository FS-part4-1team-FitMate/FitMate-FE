import StarPoints from "../Common/StarPoints";

interface Props {
  ratingAvg: number;
}

function RatingAvgCard({ ratingAvg }: Props) {
  return (
    <div className="flex flex-col justify-normal items-center gap-[16px]">
      <div className="flex items-baseline">
        <span className="text-black-400 text-[6.4rem] font-bold">{ratingAvg.toFixed(1)}&nbsp;</span>
        <span className="text-gray-100 text-[3.8rem] font-bold">/ 5</span>
      </div>
      <StarPoints rating={ratingAvg / 5} r={16} r0={9} background={false} />
    </div>
  );
}

export default RatingAvgCard;
