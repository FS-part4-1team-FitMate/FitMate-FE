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
              "text-lg border border-solid border-gray-300 p-[8px] rounded-2xl",
              selectedRegion.includes(region.value) ? "bg-blue-500 text-white" : "",
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
