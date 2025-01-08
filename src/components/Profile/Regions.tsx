import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Region } from "@/types/types";

const region_options = [
  { name: "서울", value: Region.SEOUL },
  { name: "경기", value: Region.GYEONGGI },
  { name: "인천", value: Region.INCHEON },
  { name: "대전", value: Region.DAEJEON },
  { name: "대구", value: Region.DAEGU },
  { name: "울산", value: Region.ULSAN },
  { name: "부산", value: Region.BUSAN },
  { name: "광주", value: Region.GWANGJU },
  { name: "세종", value: Region.SEJONG },
  { name: "강원", value: Region.GANGWON },
  { name: "충북", value: Region.CHUNGBUK },
  { name: "충남", value: Region.CHUNGNAM },
  { name: "전북", value: Region.JEONBUK },
  { name: "전남", value: Region.JEONNAM },
  { name: "경북", value: Region.GYEONGBUK },
  { name: "경남", value: Region.GYEONGNAM },
  { name: "제주", value: Region.JEJU },
];

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
