import { NotiParams } from "@/types/notis";
import { get } from "./method";

export async function getNotiList(params: NotiParams) {
  const res = await get("/notifications", params);
  return res.data;
}
