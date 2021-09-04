import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trivia } from "../../../Interfaces/TriviaQuestion";
import AsyncData from "../../../Utils/redux/AsyncData";
import { ChatInteractiveProps } from "../../derivative/Chat/ChatInteractive";
import { ChatRecordProps } from "../../derivative/Chat/ChatRecord";

const initialState = {
  records: [] as ChatRecordProps[],
  interactive: undefined as undefined | ChatInteractiveProps,
  
  questions: AsyncData.getInitialState<Trivia[]>(),
  currentQuestion: {
    index: 0,
    submitted: [] as string[],
    answers: [] as string[],
  },

  timetook: -1,
  score: {
    trial: -1,
    success: -1,
    fail: -1,
  },

  interactiveVisible: true,
}

export type TriviaChatInitialState = typeof initialState;

const slice = createSlice({
  name: "TriviaChat",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<TriviaChatInitialState["records"]>) => {
      state.records = action.payload;
    },
    setQuestions: (state, action: PayloadAction<TriviaChatInitialState["questions"]>) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<TriviaChatInitialState["currentQuestion"]>) => {
      state.currentQuestion = action.payload;
    },
    setTimetook: (state, action: PayloadAction<TriviaChatInitialState["timetook"]>) => {
      state.timetook = action.payload;
    },
    setInteractive: (state, action: PayloadAction<TriviaChatInitialState["interactive"]>) => {
      state.interactive = action.payload;
    },
    setInteractiveVisibility: (state, action: PayloadAction<TriviaChatInitialState["interactiveVisible"]>) => {
      state.interactiveVisible = action.payload;
    },
    setScore: (state, action: PayloadAction<TriviaChatInitialState["score"]>) => {
      state.score = action.payload;
    },
  }
})

export const TriviaChatSlice = {
  ...slice,
  initialState,
}
