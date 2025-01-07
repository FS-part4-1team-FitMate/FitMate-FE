import instance from "./instance";

export async function createLessonRequest(data: {
    lessonType: string;
    subLessonType: string;
    duration: number;
    startDate: Date;
    endDate: Date;
    locationType: string;
    address?: string;
  }): Promise<any> {
    try {
      const response = await instance.post("/user/my-lesson/pending-request", data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }