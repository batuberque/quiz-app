export interface Question {
  userId: number;
  id: number;
  title: string;
  body: string;
  options: string[];
}

export interface Answer {
  questionId: number;
  answer: string;
}

export enum QuizStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}
