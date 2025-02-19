import { img_non_review_md } from "@/imageExports";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { getMyLessonRequest } from "@/lib/api/lessonService";
import { createLessonRequest } from "@/lib/api/requestService";
import {
  LessonSubType,
  LessonType,
  LocationType,
  lessonSubType_trans,
  lessonType_trans,
  locationType_trans,
} from "@/types/types";
import Button from "@/components/Common/Button";
import ChatBubble from "@/components/CreateRequest/ChatBubble";
import ProgressBar from "@/components/CreateRequest/ProgressBar";

type FormValues = {
  lessonType: LessonType;
  lessonSubType: string;
  startDate: Date;
  endDate: Date;
  lessonCount: number;
  lessonTime: number;
  locationType: LocationType;
  roadAddress?: string;
};

const createRequest = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState<
    { type: "question" | "answer"; content: string }[]
  >([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOngoingLesson, setIsOngoingLesson] = useState(false);

  useEffect(() => {
    const fetchLessonRequests = async () => {
      try {
        const response = await getMyLessonRequest({ page: 1, limit: 10, status: "PENDING" });
        if (response.list.length) {
          console.log(response);
          setIsOngoingLesson(true);
        }
      } catch (error) {
        console.error("레슨 요청 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchLessonRequests();
  }, []);

  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      lessonType: LessonType.SPORTS,
      lessonSubType: LessonSubType.SOCCER,
      startDate: new Date(),
      endDate: new Date(),
      lessonCount: 1,
      lessonTime: 60,
      locationType: LocationType.OFFLINE,
      roadAddress: "",
    },
  });

  const fields: (keyof FormValues)[] = [
    "lessonType",
    "lessonSubType",
    "startDate",
    "endDate",
    "lessonCount",
    "lessonTime",
    "locationType",
    "roadAddress",
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

  const lessonSubTypeMap: Record<LessonType, LessonSubType[]> = {
    [LessonType.SPORTS]: [
      LessonSubType.SOCCER,
      LessonSubType.BASKETBALL,
      LessonSubType.BASEBALL,
      LessonSubType.TENNIS,
      LessonSubType.BADMINTON,
      LessonSubType.TABLE_TENNIS,
      LessonSubType.SKI,
      LessonSubType.SURFING,
      LessonSubType.BOXING,
      LessonSubType.TAEKWONDO,
      LessonSubType.JIUJITSU,
    ],
    [LessonType.FITNESS]: [
      LessonSubType.PERSONAL_TRAINING,
      LessonSubType.YOGA,
      LessonSubType.PILATES,
      LessonSubType.DIET_MANAGEMENT,
    ],
    [LessonType.REHAB]: [LessonSubType.STRETCHING, LessonSubType.REHAB_TREATMENT],
  };

  const getOptionsForSecondQuestion = (lessonType: LessonType): LessonSubType[] => {
    return lessonSubTypeMap[lessonType] || [];
  };

  const handleAnswer = () => {
    const currentStepField = fields[step];

    if (currentStepField === "locationType") {
      const locationTypeValue = currentAnswer as LocationType;
      setValue("locationType", locationTypeValue);

      if (locationTypeValue === LocationType.ONLINE) {
        setValue("roadAddress", "");
        setChatHistory((prev) => [...prev, { type: "answer", content: locationTypeValue }]);
        setStep(6);
        setProgress(100);
        return;
      }
    }

    if (step < 3) {
      setValue(currentStepField, currentAnswer);
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
    const formattedData = {
      ...data,
      lessonCount: Number(data.lessonCount),
      lessonTime: Number(data.lessonTime),
      startDate: new Date(data.startDate.setHours(0, 0, 0, 0)).toISOString(),
      endDate: new Date(data.endDate.setHours(23, 59, 59, 999)).toISOString(),
    };
    try {
      await createLessonRequest(formattedData);
      setErrorMessage("");
      alert("견적 요청이 성공적으로 제출되었습니다!");
      router.push("/user/my-lesson/lesson-history");
    } catch (err: any) {
      setErrorMessage(err || "견적 요청 제출 중 오류가 발생했습니다.");
      alert(`🚨 오류: ${err}`);
    }
  };

  return isOngoingLesson ? (
    <div className="flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
      <Image src={img_non_review_md} alt="non-request" width={160} height={160} />
      <h1 className="text-gray-400 text-lg font-regular">현재 진행 중인 레슨 요청이 있어요!</h1>
      <Link href={"/user/my-lesson/lesson-history"}>
        <Button className={"bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"}>
          내 레슨 관리
        </Button>
      </Link>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-6 bg-gray-100 min-h-screen pb-16"
    >
      <div className="bg-white p-10 w-full space-y-6 px-8 pc:px-[20rem]">
        <h1 className="text-xl">레슨 요청</h1>
        <ProgressBar progress={progress} />
      </div>

      <div className="flex flex-col space-y-4 w-full px-8 pc:px-[20rem]">
        {chatHistory.map((chat, index) => (
          <div key={index} className="flex flex-col">
            <ChatBubble
              type={chat.type}
              content={
                chat.type === "answer"
                  ? Object.values(LessonType).includes(chat.content as LessonType)
                    ? lessonType_trans[chat.content as LessonType].ko
                    : Object.values(LessonSubType).includes(chat.content as LessonSubType)
                      ? lessonSubType_trans[chat.content as LessonSubType]
                      : Object.values(LocationType).includes(chat.content as LocationType)
                        ? locationType_trans[chat.content as LocationType]
                        : chat.content
                  : chat.content
              }
            />
            {chat.type === "answer" && index / 2 < step && (
              <button
                type="button"
                onClick={() => handleEdit(Math.floor(index / 2))}
                className="text-sm text-black-500 underline self-end mr-7"
              >
                수정하기
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md pc:max-w-xl tablet:max-w-lg bg-white shadow-md p-6 rounded-b-[1.6rem] rounded-tl-[1.6rem] rounded-none self-end mr-8 pc:mr-[22rem]">
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              {Object.values(LessonType).map((option) => (
                <label
                  key={option}
                  className={`hover:bg-blue-100 hover:border hover:border-blue-300 hover:text-blue-300 flex items-center space-x-4 py-2 px-4 rounded-lg border cursor-pointer ${
                    currentAnswer === option
                      ? "bg-blue-100 border-blue-300 text-blue-300"
                      : "bg-white text-black"
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
              className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              {getOptionsForSecondQuestion(watch("lessonType") as LessonType).map((option) => (
                <label
                  key={option}
                  className={`hover:bg-blue-100 hover:border hover:border-blue-300 hover:text-blue-300 flex items-center space-x-4 py-2 px-4 rounded-lg border cursor-pointer ${
                    currentAnswer === option
                      ? "bg-blue-100 border-blue-300 text-blue-300"
                      : "bg-white text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="lessonSubType"
                    value={option}
                    onChange={() => setCurrentAnswer(option)}
                    checked={currentAnswer === option}
                  />
                  <span className="text-lg">{lessonSubType_trans[option]}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 2 && (
          <>
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
              minDate={new Date(new Date().setDate(new Date().getDate() + 3))}
            />
            <button
              type="button"
              className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-blue-600"
              onClick={handleDateSubmit}
              disabled={!dateRange[0] || !dateRange[1]}
            >
              선택 완료
            </button>
          </>
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
                  className="focus:outline focus:outline-blue-300 w-full py-2 px-4 rounded-lg border-b-0 text-lg"
                  placeholder="횟수를 입력하세요"
                  value={currentAnswer}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    setCurrentAnswer(value.toString());
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-blue-600"
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
                  className="focus:outline focus:outline-blue-300 w-full py-2 px-4 rounded-lg border-b-0 text-lg"
                  placeholder="시간을 입력하세요"
                  value={currentAnswer}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    setCurrentAnswer(value.toString());
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              {Object.values(LocationType).map((option) => (
                <label
                  key={option}
                  className={`hover:bg-blue-100 hover:border hover:border-blue-300 hover:text-blue-300 flex items-center space-x-4 py-2 px-4 rounded-lg border cursor-pointer ${
                    currentAnswer === option
                      ? "bg-blue-100 border-blue-300 text-black"
                      : "bg-white text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="locationType"
                    value={option}
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-blue-500 checked:border-transparent"
                    onChange={() => setCurrentAnswer(option as LocationType)}
                    checked={currentAnswer === option}
                  />
                  <span className="text-lg">{locationType_trans[option]}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAnswer}
              className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={!currentAnswer}
            >
              입력 완료
            </button>
          </div>
        )}

        {step === 6 && watch("locationType") === LocationType.OFFLINE && (
          <div className="space-y-4">
            <Controller
              name="roadAddress"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="roadAddress"
                  type="button"
                  className="w-full py-2 px-4 rounded-lg text-lg border"
                  value={watch("roadAddress") || ""}
                  onClick={() =>
                    new window.daum.Postcode({
                      oncomplete: function (data: any) {
                        var addr = "";
                        if (data.userSelectedType === "R") {
                          addr = data.roadAddress;
                        } else {
                          addr = data.jibunAddress;
                        }
                        setValue("roadAddress", addr);
                      },
                    }).open()
                  }
                />
              )}
            />
          </div>
        )}
        {(step === 6 || watch("locationType") === LocationType.ONLINE) && (
          <button
            type="submit"
            className="w-full mt-4 bg-blue-300 text-lg text-white py-3 rounded-lg hover:bg-green-600"
            disabled={watch("locationType") === LocationType.OFFLINE && !watch("roadAddress")}
          >
            견적 요청하기
          </button>
        )}
      </div>
    </form>
  );
};

export default createRequest;
