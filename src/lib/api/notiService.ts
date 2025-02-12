import { NotiParams } from "@/types/notis";
import { get, patch } from "./method";

export async function getNotiList(params: NotiParams) {
  const res = await get("/notifications", params);
  return res.data;
}

export async function readNoti(notiId: number) {
  const res = await patch(`/notifications/${notiId}/read`);
  return res.data;
}
