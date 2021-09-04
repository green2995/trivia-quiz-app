import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shuffle } from "lodash";
import { Trivia } from "../../../Interfaces/TriviaQuestion";
import { TriviaFileSystem } from "../../../System";

const initialState = {
  failedTrivias: [] as TriviaFileSystem.FailedTrivia[],
  triviaScore: {
    fail: 0,
    success: 0,
    trial: 0,
  } as TriviaFileSystem.TriviaScore,
  currentFailed: {
    index: 0,
    answers: [] as string[],
    trivia: undefined as Trivia | undefined,
    chosen: undefined as string | undefined,
  },
  overcameFailure: false,
  overcomeCount: 0,
}

export type TriviaSummaryState = typeof initialState;

const slice = createSlice({
  name: "triviaSummary",
  initialState,
  reducers: {
    setFailedTrivias: (state, action: PayloadAction<TriviaFileSystem.FailedTrivia[]>) => {
      state.failedTrivias = action.payload;
    },
    setTriviaScore: (state, action: PayloadAction<TriviaFileSystem.TriviaScore>) => {
      state.triviaScore = action.payload;
    },
    setFailedIndex: (state, action: PayloadAction<number>) => {
      if (!state.failedTrivias[action.payload]) {
        state.currentFailed = {
          index: 0,
          answers: [],
          trivia: undefined,
          chosen: undefined,
        }
      } else {
        const trivia = state.failedTrivias[action.payload]?.trivia;
        state.currentFailed = {
          index: action.payload,
          answers: shuffle([...trivia.incorrect_answers, trivia.correct_answer]),
          chosen: undefined,
          trivia,
        };
      }
    },
    submitForFailed: (state, action: PayloadAction<string>) => {
      state.currentFailed.chosen = action.payload;
    },
    setOvercameFailure: (state, action: PayloadAction<boolean>) => {
      state.overcameFailure = action.payload;
    },
    setOvercomeCount: (state, action: PayloadAction<number>) => {
      state.overcomeCount = action.payload
    }
  }
})


export const TriviaSummarySlice = {
  initialState,
  ...slice,
}