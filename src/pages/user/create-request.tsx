import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ChatBubble from "@/components/ChatBubble";
import ProgressBar from "@/components/ProgressBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createRequest } from "@/lib/api/requestService";
const LessonRequestForm = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      userId: "user-12345", // 실제 유저 ID로 변경 필요
      lessonType: "",
      subLessonType: "",
      duration: 0,
      startDate: null,
      endDate: null,
      locationType: "",
      address: "",
    },
  });

  const questions = [
    "어떤 운동을 하고 싶으세요?",
    "어떤 활동을 원하세요?",
    "기간을 정해주세요.",
    "몇 번을 원하시나요?",
    "수업 장소 유형을 선택하세요.",
  ];

  const options = {
    0: ["스포츠", "피트니스"],
    1: ["구기 스포츠", "계절 스포츠", "격투 스포츠"],
    4: ["온라인", "오프라인"],
  };

  const handleAnswer = (answer) => {
    const fields = ["lessonType", "subLessonType", "locationType"];
    if (fields[step]) {
      setValue(fields[step], answer);
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
      setProgress(((step + 1) / questions.length) * 100);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setValue("startDate", start);
    setValue("endDate", end);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createRequest(data);
      console.log("응답 성공:", response);
      setSuccess(true);
    } catch (err) {
      console.error("응답 실패:", err);
      setError("서버와 통신 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-4 p-6 bg-gray-100 min-h-screen"
    >
      <h1 className="text-2xl font-bold">견적 요청</h1>
      <ProgressBar progress={progress} />

      <div className="flex flex-col space-y-4 w-full max-w-md">
        {questions.slice(0, step + 1).map((question, index) => (
          <ChatBubble key={index} type="question" content={question} />
        ))}

        {step === 0 && (
          <div className="flex space-x-4">
            {options[0].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleAnswer(option)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="flex space-x-4">
            {options[1].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleAnswer(option)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <Controller
            name="dateRange"
            control={control}
            render={() => (
              <DatePicker
                selected={watch("startDate")}
                onChange={handleDateChange}
                startDate={watch("startDate")}
                endDate={watch("endDate")}
                selectsRange
                inline
              />
            )}
          />
        )}

        {step === 3 && (
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                min="1"
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="숫자를 입력하세요"
              />
            )}
          />
        )}

        {step === 4 && (
          <div className="flex space-x-4">
            {options[4].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleAnswer(option)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {step === questions.length - 1 && (
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "제출 중..." : "제출하기"}
          </button>
        )}
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">요청이 성공적으로 제출되었습니다!</div>}
    </form>
  );
};

export default LessonRequestForm;