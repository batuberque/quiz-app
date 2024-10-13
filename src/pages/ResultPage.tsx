import React from "react";
import { useAppSelector } from "../redux/hook";
import ResultTable from "../components/ResultTable";

const ResultPage: React.FC = () => {
  const { answers, questions } = useAppSelector((state) => state.quiz);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 mt-5 text-center">Sonuçlar</h2>
      <ResultTable answers={answers} questions={questions} />
    </div>
  );
};

export default ResultPage;
