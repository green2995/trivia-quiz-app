import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TriviaCategory } from "../../../Interfaces/Category";
import { Trivia } from "../../../Interfaces/TriviaQuestion";
import AsyncData from "../../../Utils/redux/AsyncData";
import { ChatRecordProps } from "../../derivative/Chat/ChatRecord/ChatRecord";

const initialState = {
  records: [] as ChatRecordProps[],
  interactive: "none" as "none" | "start" | "next" | "select",
  resultVisible: false,
  randomCategory: false,
  
  questions: AsyncData.getInitialState<Trivia[]>(),
  currentQuestion: {
    index: 0,
    submitted: [] as string[],
    answers: [] as string[],
  },

  score: {
    trial: 0,
    success: 0,
    fail: 0,
  },

  interactiveVisible: true,

  category: {
    id: -1,
    name: "",
  },

  time: {
    start: -1,
    end: -1,
  },

  waitingResponse: false,
}

export type TriviaChatState = typeof initialState;

const slice = createSlice({
  name: "TriviaChat",
  initialState,
  reducers: {
    setState(state, action: PayloadAction<TriviaChatState>) {
      state = action.payload;
    },
    setRecords: (state, action: PayloadAction<TriviaChatState["records"]>) => {
      state.records = action.payload;
    },
    setRandomCategory(state, action: PayloadAction<boolean>) {
      state.randomCategory = action.payload;
    },
    setQuestions: (state, action: PayloadAction<TriviaChatState["questions"]>) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<TriviaChatState["currentQuestion"]>) => {
      state.currentQuestion = action.payload;
    },
    setInteractive: (state, action: PayloadAction<TriviaChatState["interactive"]>) => {
      state.interactive = action.payload;
    },
    setInteractiveVisibility: (state, action: PayloadAction<TriviaChatState["interactiveVisible"]>) => {
      state.interactiveVisible = action.payload;
    },
    setScore: (state, action: PayloadAction<TriviaChatState["score"]>) => {
      state.score = action.payload;
    },
    setCategory(state, action: PayloadAction<TriviaChatState["category"]>) {
      state.category = action.payload;
    },
    setTime(state, action: PayloadAction<TriviaChatState["time"]>) {
      state.time = action.payload;
    },
    setWaitingResponse(state, action: PayloadAction<TriviaChatState["waitingResponse"]>) {
      state.waitingResponse = action.payload;
    },
    setResultVisible(state, action: PayloadAction<boolean>) {
      state.resultVisible = action.payload;
    },

    appendRecord(state, action: PayloadAction<ChatRecordProps>) {
      state.records.push(action.payload);
    },

    loadQuestions(state, action: PayloadAction<number | undefined>) {},
    loadQuestions_success(state, action: PayloadAction<Trivia[]>) {},
    loadQuestions_fail(state) {},

    startQuiz() {},

    retrieveQuestions() {},

    submitAnswer(state, action: PayloadAction<{questionIndex: number, answer: string}>) {},
    answer_correct(){},
    answer_incorrect(){},

    nextQuestion(){},
    completeQuiz(){},

    retry(){},
    nextSet(){},

    resetPlay(){},
    initialize(){},
  }
})

export const TriviaChatSlice = {
  ...slice,
  initialState,
}
