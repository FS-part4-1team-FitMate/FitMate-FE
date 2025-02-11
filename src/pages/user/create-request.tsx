import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { createLessonRequest } from "@/lib/api/requestService";
import ChatBubble from "@/components/CreateRequest/ChatBubble";
import ProgressBar from "@/components/CreateRequest/ProgressBar";
import { LessonType, lessonType_trans } from "@/types/types";

type FormValues = {
  lessonType: LessonType;
  subLessonType: string;
  startDate: Date;
  endDate: Date;
  lessonCount: number;
  lessonTime: number;
  locationType: string;
  address?: string;
};

const createRequest = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState<
    { type: "question" | "answer"; content: string }[]
  >([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);

  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      lessonType: LessonType.SPORTS,
      subLessonType: "",
      startDate: new Date(),
      endDate: new Date(),
      lessonCount: 0,
      lessonTime: 0,
      locationType: "",
      address: "",
    },
  });

  const fields: (keyof FormValues)[] = [
    "lessonType",
    "subLessonType",
    "startDate",
    "endDate",
    "lessonCount",
    "lessonTime",
    "locationType",
    "address",
  ];

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([{ type: "question", content: "어떤 운동을 하고 싶으세요?" }]);
    }

    let script: HTMLScriptElement | null = null;
    if (!window.daum) {
      script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const questions = [
    "어떤 운동을 하고 싶으세요?",
    "어떤 활동을 원하세요?",
    "기간을 정해주세요.",
    "몇 번을 원하시나요?",
    "시간을 정해주세요",
    "수업 장소 유형을 선택해주세요.",
    "주소를 입력해주세요.",
  ];

  const lessonSubTypeMap: Record<LessonType, string[]> = {
    [LessonType.SPORTS]: [
      "축구", "농구", "야구", "테니스", "배드민턴", "탁구",
      "스키", "서핑", "복싱", "태권도", "주짓수"
    ],
    [LessonType.FITNESS]: [
      "퍼스널 트레이닝", "요가", "필라테스", "다이어트 관리"
    ],
    [LessonType.REHAB]: [
      "스트레칭", "재활 치료"
    ],
  };

  const getOptionsForSecondQuestion = (lessonType: LessonType) => {
    return lessonSubTypeMap[lessonType] || [];
  };

  const handleAnswer = () => {
    if (step < 3) {
      setValue(fields[step], currentAnswer);
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: currentAnswer },
        { type: "question", content: questions[step + 1] },
      ]);
      setStep(step + 1);
      setProgress(((step + 1) / questions.length) * 100);
      setCurrentAnswer("");
    } else {
      setValue(fields[step + 1], currentAnswer);
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: currentAnswer },
        { type: "question", content: questions[step + 1] },
      ]);
      setStep(step + 1);
      setProgress(((step + 1) / questions.length) * 100);
      setCurrentAnswer("");
    }
  };

  const handleEdit = (editStep: number) => {
    setStep(editStep);
    const fieldToEdit = fields[editStep];
    const currentValue = watch(fieldToEdit)?.toString() || "";
    setCurrentAnswer(currentValue);
    setChatHistory((prev) => prev.slice(0, editStep * 2 + 1));
    setProgress((editStep / questions.length) * 100);
  };

  const handleDateSubmit = () => {
    if (dateRange[0] && dateRange[1]) {
      setValue("startDate", dateRange[0]);
      setValue("endDate", dateRange[1]);
      setTimeout(() => {
        console.log("startDate:", watch("startDate"));
        console.log("endDate:", watch("endDate"));
      }, 100);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`,
        },
        { type: "question", content: questions[step + 1] },
      ]);
      setStep(step + 1);
      setProgress(((step + 1) / questions.length) * 100);
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log("제출 데이터:", data);
    try {
      await createLessonRequest(data);
      alert("견적 요청이 성공적으로 제출되었습니다!");
    } catch (err) {
      alert("견적 요청 제출 중 오류가 발생했습니다.");
      console.log("제출 데이터:", data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-6 bg-gray-100 min-h-screen"
    >
      <div className="bg-white p-10 w-full space-y-6 px-[20rem]">
        <h1 className="text-xl">견적 요청</h1>
        <ProgressBar progress={progress} />
      </div>

      <div className="flex flex-col space-y-4 w-full px-[20rem]">
        {chatHistory.map((chat, index) => (
          <div key={index} className="flex flex-col">
            <ChatBubble type={chat.type} content={chat.content} />
            {chat.type === "answer" && index / 2 < step && (
              <button
                type="button"
                onClick={() => handleEdit(Math.floor(index / 2))}
                className="flex text-sm text-black-500 underline self-end mr-7"
              >
                수정하기
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl bg-white shadow-md p-6 rounded-b-lg rounded-tl-lg rounded-none self-end mr-[22rem]">
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              {Object.values(LessonType).map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-4 py-2 px-4 rounded-lg border cursor-pointer ${
                    currentAnswer === option ? "bg-blue-100 text-black" : "bg-white text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="lessonType"
                    value={option}
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent"
                    onChange={() => setCurrentAnswer(option)}
                    checked={currentAnswer === option}
                  />
                  <span className="text-lg">{lessonType_trans[option]?.ko}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              {getOptionsForSecondQuestion(watch("lessonType")).map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-4 py-2 px-4 rounded-lg border cursor-pointer ${
                    currentAnswer === option ? "bg-blue-100 text-black" : "bg-white text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="subLessonType"
                    value={option}
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent"
                    onChange={() => setCurrentAnswer(option)}
                    checked={currentAnswer === option}
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <DatePicker
              selected={dateRange[0]}
              onChange={(dates) => {
                console.log("dates:", dates);
                setDateRange(dates as [Date, Date]);
              }}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              selectsRange
              inline
              dateFormat="yyyy.MM.dd"
              locale={ko}
              showPopperArrow={false}
              calendarClassName="custom-datepicker"
            />
            <button
              type="button"
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-600"
              onClick={handleDateSubmit}
              disabled={!dateRange[0] || !dateRange[1]}
            >
              선택 완료
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Controller
              name="lessonCount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full py-2 px-4 rounded-lg border-b-0 text-lg"
                  placeholder="횟수를 입력하세요"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                />
              )}
            />
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Controller
              name="lessonTime"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full py-2 px-4 rounded-lg border-b-0 text-lg"
                  placeholder="횟수를 입력하세요"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                />
              )}
            />
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              {["온라인", "오프라인"].map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-4 py-2 px-4 rounded-lg border cursor-pointer ${
                    currentAnswer === option ? "bg-blue-100 text-black" : "bg-white text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="lessonType"
                    value={option}
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent"
                    onChange={() => setCurrentAnswer(option)}
                    checked={currentAnswer === option}
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        

        {step === 6 && (
          <div className="space-y-4">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="address"
                  type="button"
                  className="w-full py-2 px-4 rounded-lg text-lg border"
                  value={watch("address") || ""}
                  onClick={() =>
                    new window.daum.Postcode({
                      oncomplete: function (data: any) {
                        var addr = "";
                        if (data.userSelectedType === "R") {
                          addr = data.roadAddress;
                        } else {
                          addr = data.jibunAddress;
                        }
                        setValue("address", addr);
                      },
                    }).open()
                  }
                />
              )}
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-green-600"
              disabled={!watch("address")}
            >
              견적 요청하기
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default createRequest;
