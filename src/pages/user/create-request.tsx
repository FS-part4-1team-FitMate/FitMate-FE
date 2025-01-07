import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import ProgressBar from "@/components/CreateRequest/ProgressBar";
import ChatBubble from "@/components/CreateRequest/ChatBubble";
import { createLessonRequest } from "@/lib/api/requestService";

type FormValues = {
  lessonType: string;
  subLessonType: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  locationType: string;
  address?: string;
};



const createRequest = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState<{ type: "question" | "answer"; content: string }[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);

  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      lessonType: "",
      subLessonType: "",
      startDate: new Date(),
      endDate: new Date(),
      duration: 0,
      locationType: "",
      address: "",
    },
  });

  const fields: (keyof FormValues)[] = [
    "lessonType",
    "subLessonType",
    "startDate",
    "endDate",
    "duration",
    "locationType",
    "address",
  ];

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([{ type: "question", content: "어떤 운동을 하고 싶으세요?" }]);
    }
  }, []);

  const questions = [
    "어떤 운동을 하고 싶으세요?",
    "어떤 활동을 원하세요?",
    "기간을 정해주세요.",
    "몇 번을 원하시나요?",
    "수업 장소 유형을 선택해주세요.",
    "주소를 입력해주세요.",
  ];

   const getOptionsForSecondQuestion = (lessonType: string) => {
    switch (lessonType) {
      case "스포츠":
        return ["구기 스포츠", "계절 스포츠", "격투 스포츠"];
      case "피트니스":
        return ["요가", "필라테스", "식단"];
      case "재활운동":
        return ["운동치료", "수치료"];
      default:
        return [];
    }
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
    setChatHistory((prev) =>
      prev.slice(0, editStep * 2 + 1)
    );
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 bg-gray-100 min-h-screen">
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
              {["스포츠", "피트니스", "재활운동"].map((option) => (
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
                setDateRange(dates as [Date, Date])}}
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
              name="duration"
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

        {step === 5 && (
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
                  onClick={() => new daum.Postcode({
                    oncomplete: function(data: any) {
                        var addr = '';
                        if (data.userSelectedType === 'R') {
                            addr = data.roadAddress;
                        } else {
                            addr = data.jibunAddress;
                        }
                        setValue("address", addr);
                    }
                    
                  }).open()}
                />
              )}
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-300 text-white py-3 rounded-lg hover:bg-green-600"
              disabled={!watch("address")}
            >
              견적 확정하기
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default createRequest;
