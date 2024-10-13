import React, { useEffect, useState, useCallback } from "react";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import ResultPage from "./ResultPage";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  answerQuestion,
  fetchQuestions,
  nextQuestion,
} from "../redux/slices/quizSlice";
import { QuizStatus } from "../types";
import useQuestionTimer from "../hooks/useQuestionTimer";

const QuizPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, status } = useAppSelector(
    (state) => state.quiz
  );
  const [isClickable, setIsClickable] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (status === QuizStatus.Idle) {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setIsClickable(false);
  }, [currentQuestionIndex]);

  const onEnableClick = useCallback(() => {
    setIsClickable(true);
  }, []);

  const onNextQuestion = useCallback(() => {
    setIsClickable(false);
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
    } else {
      setQuizFinished(true);
    }
  }, [currentQuestionIndex, questions.length, dispatch]);

  const secondsLeft = useQuestionTimer({
    onEnableClick,
    onNextQuestion,
    resetKey: currentQuestionIndex,
  });

  if (status === QuizStatus.Loading) return <div>Yükleniyor...</div>;
  if (status === QuizStatus.Failed)
    return <div>Veri çekilirken bir hata oluştu.</div>;

  if (quizFinished || currentQuestionIndex >= questions.length) {
    return <ResultPage />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  const handleAnswer = (answer: string) => {
    if (isClickable) {
      dispatch(
        answerQuestion({
          questionId: currentQuestion.id,
          answer,
        })
      );
      setIsClickable(false);
      onNextQuestion();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Timer secondsLeft={secondsLeft} />
      <QuestionCard
        question={currentQuestion}
        questionNumber={questionNumber}
        onAnswer={handleAnswer}
        isClickable={isClickable}
      />
    </div>
  );
};

export default QuizPage;
