import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TriviaFileSystem } from "../../../System";

const initialState = {
  failedTriviaIndex: 0,
  failedTrivias: [] as TriviaFileSystem.FailedTrivia[],
  triviaResults: [] as TriviaFileSystem.TriviaResult[],
}

export type TriviaSummaryState = typeof initialState;

const slice = createSlice({
  name: "triviaSummary",
  initialState,
  reducers: {
    setFailedTrivias: (state, action: PayloadAction<TriviaFileSystem.FailedTrivia[]>) => {
      state.failedTrivias = action.payload;
    },
    setTriviaResults: (state, action: PayloadAction<TriviaFileSystem.TriviaResult[]>) => {
      state.triviaResults = action.payload;
    }
  }
})


export const TriviaSummarySlice = {
  initialState,
  ...slice,
}