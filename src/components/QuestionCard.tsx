import React, { useMemo } from "react";
import { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isClickable: boolean;
  questionNumber: Question["id"];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  onAnswer,
  isClickable,
}) => {
  const optionLabels = useMemo(() => ["A", "B", "C", "D"], []);

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">
        Soru {questionNumber} : {question.title}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(optionLabels[index])}
            disabled={!isClickable}
            className={`p-4 text-left border rounded ${
              isClickable
                ? "hover:bg-gray-100"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <span className="font-bold mr-2">{optionLabels[index]}.</span>{" "}
            {option}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Soruyu cevapladıktan sonra geri dönüş yapamayacaksınız. Boş bırakılan
        sorular işlenmeyecektir.
      </p>
    </div>
  );
};

export default QuestionCard;
