import instance from "./instance";

export async function createLessonRequest(data: {
    lessonType: string;
    lessonSubType: string;
    startDate: string;
    endDate: string;
    lessonCount: number;
    lessonTime: number;
    locationType: string;
    address?: string;
  }): Promise<any> {
    try {
      const response = await instance.post("/lessons", data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }


  export async function getSentRequest({
    pageParam,
    trainer_id,
    limit
  }: { pageParam: number, trainer_id: string, limit: number }): Promise<any> {
    try {
      console.log("📡 API 요청:", `/quotes?trainer_id=${trainer_id}&limit=${limit}&page=${pageParam}`);
      const response = await instance.get(`/quotes?trainer_id=${trainer_id}&limit=${limit}&page=${pageParam}`);
      console.log("📡 API 응답 데이터:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch sent requests:", error);
      throw new Error("견적 요청을 불러오는 중 오류가 발생했습니다.");
    }
  }

  export async function getRejectedRequest({
    pageParam,
    trainer_id,
    limit
  }: { pageParam: number, trainer_id: string, limit: number }): Promise<any> {
    try {
      const response = await instance.get(`/quotes?trainer_id=${trainer_id}&limit=${limit}&page=${pageParam}&status=REJECTED`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sent requests:", error);
      throw new Error("견적 요청을 불러오는 중 오류가 발생했습니다.");
    }
  }