import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import QuestionStep from "@/components/Question";
import ChatBubble from "@/components/ChatBubble";


const CreateRequest: React.FC = () => {
    const steps = [
        {
          question: "어떤 운동을 원하시나요?",
          options: [
            "스포츠 (구기 스포츠, 계절 스포츠, 격투 스포츠 등)",
            "피트니스 (PT, 요가, 필라테스, 식단 관리 등)",
          ],
        },
        {
          question: "시작 날짜와 종료 날짜를 선택해주세요.",
          options: [],
        },
        {
          question: "출발지와 도착지를 입력해주세요.",
          options: [],
        },
      ];
    
      const [currentStep, setCurrentStep] = useState(0);
      const [messages, setMessages] = useState<
        { type: "question" | "answer"; content: string }[]
      >([]);
      const [address, setAddress] = useState({ start: "", end: "" });
    
      const handleAnswer = (answer: string) => {
        setMessages((prev) => [
          ...prev,
          { type: "answer", content: answer },
        ]);
        if (currentStep < steps.length - 1) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { type: "question", content: steps[currentStep + 1].question },
            ]);
            setCurrentStep((prev) => prev + 1);
          }, 500);
        }
      };

      const handleAddressSubmit = () => {
        if (address.start.trim() && address.end.trim()) {
          setMessages((prev) => [
            ...prev,
            {
              type: "answer",
              content: `출발지: ${address.start}, 도착지: ${address.end}`,
            },
          ]);
          setCurrentStep((prev) => prev + 1);
        } else {
          alert("출발지와 도착지를 모두 입력해주세요.");
        }
      };
    
      const progress = ((currentStep + 1) / steps.length) * 100;

      const handleConfirm = () => {
        router.push("/my-lesson/past-lesson");
      };
    
      return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center p-4">
          <div className="max-w-xl w-full bg-white rounded-lg shadow p-6 space-y-6">
            <h1 className="text-2xl font-bold">견적 요청</h1>
    
            <ProgressBar progress={progress} />
    
            <div className="space-y-4 mt-4">
              {messages.map((message, index) => (
                <ChatBubble key={index} type={message.type} content={message.content} />
              ))}
            </div>
    
            {currentStep < steps.length && (
                <QuestionStep
                    step={currentStep}
                    question={steps[currentStep].question}
                    options={steps[currentStep].options}
                    onSubmit={
                    currentStep === 2
                        ? handleAddressSubmit
                        : handleAnswer
                    }
                    address={address}
                    setAddress={setAddress}
                />
            )}

            {currentStep === steps.length && (
            <div className="mt-6">
                <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                onClick={handleConfirm}
                >
                견적 확정하기
                </button>
            </div>
            )}
        </div>
    </div>
  );
};
    

export default CreateRequest;