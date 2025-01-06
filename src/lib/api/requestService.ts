import instance from "./instance";

export async function createRequest(data: {
    userId: string;
    lessonType: string;
    subLessonType: string;
    duration: number;
    startDate: Date;
    endDate: Date;
    locationType: string;
    address?: string;
  }): Promise<any> {
    try {
      const response = await instance.post("/lesson-requests", data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }