import React, { useMemo } from "react";
import { Answer, Question } from "../types";

interface ResultTableProps {
  answers: Answer[];
  questions: Question[];
}

const ResultTable: React.FC<ResultTableProps> = ({ answers, questions }) => {
  const answerMap = useMemo(() => {
    const map = new Map<number, string>();
    answers.forEach((answer) => {
      map.set(answer.questionId, answer.answer);
    });
    return map;
  }, [answers]);

  const answerRows = useMemo(() => {
    return questions.map((question, index) => {
      const userAnswer = answerMap.get(question.id) || "Cevap Verilmedi";
      const questionNumber = index + 1;

      return (
        <tr key={index}>
          <td className="py-2 px-4 border-b text-center">{questionNumber}</td>
          <td className="py-2 px-4 border-b">{question.title}</td>
          <td className="py-2 px-4 border-b text-center">{userAnswer}</td>
        </tr>
      );
    });
  }, [questions, answerMap]);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Soru No</th>
          <th className="py-2 px-4 border-b">Soru</th>
          <th className="py-2 px-4 border-b">Verilen Yanıt</th>
        </tr>
      </thead>
      <tbody>{answerRows}</tbody>
    </table>
  );
};

export default React.memo(ResultTable);
