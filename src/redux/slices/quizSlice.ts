import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, Question, QuizStatus } from "../../types";
import axiosInstance from "../../api/axios";
import { parseOptions } from "../../utils/parseOptions";

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  status: QuizStatus;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  status: QuizStatus.Idle,
};

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async () => {
    const response = await axiosInstance.get("/posts");
    const data = response.data.slice(0, 10) as Question[];

    const questionsWithOptions = data.map((question) => ({
      ...question,
      options: parseOptions(question.body),
    }));

    return questionsWithOptions;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    answerQuestion(state, action: PayloadAction<Answer>) {
      state.answers.push(action.payload);
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.status = QuizStatus.Idle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.status = QuizStatus.Loading;
    });

    builder.addCase(
      fetchQuestions.fulfilled,
      (state, action: PayloadAction<Question[]>) => {
        state.status = QuizStatus.Succeeded;
        state.questions = action.payload;
      }
    );

    builder.addCase(fetchQuestions.rejected, (state) => {
      state.status = QuizStatus.Failed;
    });
  },
});

export const { answerQuestion, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
