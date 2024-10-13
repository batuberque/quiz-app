import { useEffect, useRef, useState } from "react";

interface UseQuestionTimerProps {
  onEnableClick: () => void;
  onNextQuestion: () => void;
  duration?: number;
  enableClickAfter?: number;
  resetKey: unknown;
}

const useQuestionTimer = ({
  onEnableClick,
  onNextQuestion,
  duration = 30,
  enableClickAfter = 10,
  resetKey,
}: UseQuestionTimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSecondsLeft(duration);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const enableClickTimeout = setTimeout(() => {
      onEnableClick();
    }, enableClickAfter * 1000);

    const nextQuestionTimeout = setTimeout(() => {
      onNextQuestion();
    }, duration * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearTimeout(enableClickTimeout);
      clearTimeout(nextQuestionTimeout);
    };
  }, [onEnableClick, onNextQuestion, duration, enableClickAfter, resetKey]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setSecondsLeft(0);
    }
  }, [secondsLeft]);

  return secondsLeft;
};

export default useQuestionTimer;
