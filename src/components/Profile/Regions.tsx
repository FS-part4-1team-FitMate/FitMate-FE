import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Region, region_options } from "@/types/types";

interface Props {
  selectedRegion: Region[];
  setSelectedRegion: Dispatch<SetStateAction<Region[]>>;
  register: UseFormRegisterReturn;
}

function Regions({ selectedRegion, setSelectedRegion, register }: Props) {
  return (
    <label htmlFor="region" className="flex flex-wrap gap-[8px]">
      {region_options.map((region) => {
        return (
          <label
            key={region.value}
            className={clsx(
              "hover:border-blue-300 hover:bg-blue-100 text-lg border border-line-200 py-2 px-6 rounded-[2rem] shadow-card",
              selectedRegion.includes(region.value)
                ? " bg-blue-100 text-blue-300 border border-blue-300 font-semibold"
                : "",
            )}
          >
            <input
              className="hidden"
              type="checkbox"
              value={region.value}
              {...register}
              onClick={() =>
                setSelectedRegion((regions) => {
                  if (regions.includes(region.value)) {
                    return regions.filter((regi) => regi !== region.value);
                  } else {
                    return [...regions, region.value];
                  }
                })
              }
            />
            {region.name}
          </label>
        );
      })}
    </label>
  );
}

export default Regions;
