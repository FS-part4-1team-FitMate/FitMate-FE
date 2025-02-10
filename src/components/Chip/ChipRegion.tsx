import { Region, region_trans } from "@/types/types";

function ChipRegion({ region }: { region: Region }) {
  return (
    <div
      className={`inline-block py-[0.6rem] px-[1.2rem] border border-gray-100 rounded-full text-blue-400 text-md font-medium bg-bg-100 shadow-card pc:text-2lg  pc:py-4 pc:px-8`}
    >
      {region_trans[region]}
    </div>
  );
}

export default ChipRegion;
