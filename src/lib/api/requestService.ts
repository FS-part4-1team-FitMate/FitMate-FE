import { QuoteDetail, FormattedData, QuoteSummary } from "@/types/quote";
import { get, post } from "./method";

export async function createLessonRequest(data: FormattedData): Promise<any> {
  try {
    const response = await post("/lessons", data);
    console.log(data)
    return response.data;
  } catch (err: any) {
    console.log(data)
    console.error("🚨 레슨 요청 에러:", err.response?.data);
    throw err.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
  }
}


  export async function getSentRequest({
    pageParam,
    trainer_id,
    limit
  }: { pageParam: number, trainer_id: string, limit: number }): Promise<any> {
    try {
      const response = await get(`/quotes?trainer_id=${trainer_id}&limit=${limit}&page=${pageParam}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sent requests:", error);
      throw new Error("견적 요청을 불러오는 중 오류가 발생했습니다.");
    }
  }

  export const getDetailRequest = async (lessonRequestId: string | undefined): Promise<QuoteDetail> => {
    if (!lessonRequestId) {
      console.error("lessonRequestId is undefined, request aborted.");
      return Promise.reject("lessonRequestId is undefined");
    }
  
    try {
      console.log(`Requesting: /quotes?lesson_request_id=${lessonRequestId}`);
  
      const response = await get(`/quotes?lesson_request_id=${lessonRequestId}`);
  
      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  };

  export async function getRejectedRequest({
    pageParam,
    trainer_id,
    limit
  }: { pageParam: number, trainer_id: string, limit: number }): Promise<any> {
    try {
      const response = await get(`/quotes?trainer_id=${trainer_id}&status=REJECTED`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sent requests:", error);
      throw new Error("견적 요청을 불러오는 중 오류가 발생했습니다.");
    }
  }