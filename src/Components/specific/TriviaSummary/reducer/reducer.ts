import { createReducer } from "@reduxjs/toolkit";
import { TriviaFileSystem } from "../../../../System";
import * as actions from "./actions"

export const initialState = {
  incorrectAnswers: [] as TriviaFileSystem.IncorrectAnswer[],
  triviaResults: [] as TriviaFileSystem.TriviaResult[],
}

export type TriviaSummaryState = typeof initialState;

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setIncorrectAnswers, (state, action) => {
    state.incorrectAnswers = action.payload;
  });

  builder.addCase(actions.setTriviaResults, (state, action) => {
    state.triviaResults = action.payload;
  });
})

export default reducer;