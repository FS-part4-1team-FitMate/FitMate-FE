import { Region, region_trans } from "@/types/types";

interface Props {
  region: Region;
  size: "lg" | "xl";
}

function ChipRegion({ region, size }: Props) {
  return (
    <div
      className={`inline-block text-${size} rounded-full border border-solid border-slate-900 text-slate-900 py-[4px] px-[12px]`}
    >
      {region_trans[region]}
    </div>
  );
}

export default ChipRegion;
