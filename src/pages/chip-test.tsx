import { Region } from "@/types/types";
import ChipRegion from "@/components/Chip/ChipRegion";

function ChipTest() {
  return (
    <>
      <ChipRegion region={Region.SEOUL} size="lg" />
      <ChipRegion region={Region.JEJU} size="xl" />
    </>
  );
}

export default ChipTest;
