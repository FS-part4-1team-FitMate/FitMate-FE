import React from "react";
import DatePicker from "react-datepicker";

type QuestionStepProps = {
  step: number;
  question: string;
  options?: string[];
  onSubmit: () => void;
  address?: { start: string; end: string };
  setAddress?: React.Dispatch<React.SetStateAction<{ start: string; end: string }>>;
};

const QuestionStep: React.FC<QuestionStepProps> = ({
  step,
  question,
  options,
  onSubmit,
  address,
  setAddress,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question}</p>
      {options && options.length > 0 ? (
        options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left p-4 border rounded-lg hover:bg-gray-100"
            onClick={() => onSubmit(option)}
          >
            {option}
          </button>
        ))
      ) : step === 1 ? (
        <div>
          <div className="space-y-4">
            <DatePicker
              placeholderText="시작 날짜 선택"
              className="w-full p-3 border rounded-lg"
            />
            <DatePicker
              placeholderText="종료 날짜 선택"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            onClick={onSubmit}
          >
            날짜 선택 완료
          </button>
        </div>
      ) : step === 2 && address && setAddress ? (
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">출발지</label>
              <input
                type="text"
                value={address.start}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, start: e.target.value }))
                }
                placeholder="출발지 입력"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">도착지</label>
              <input
                type="text"
                value={address.end}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, end: e.target.value }))
                }
                placeholder="도착지 입력"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          <button
            className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            onClick={onSubmit}
          >
            주소 입력 완료
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionStep;