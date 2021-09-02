import { createReducer } from "@reduxjs/toolkit";
import { Trivia } from "../../../../Interfaces/Trivia";
import AsyncData from "../../../../Utils/redux/AsyncData";
import { ChatRecordProps } from "../../../derivative/Chat/ChatRecord";
import * as actions from "./actions";

export const initialState = {
  records: [] as ChatRecordProps[],
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
  }
}

export type TriviaChatInitialState = typeof initialState;

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setRecorods, (state, action) => {
    state.records = action.payload;
  })
  
  builder.addCase(actions.setQuestions, (state, action) => {
    state.questions = action.payload;
  });
  
  builder.addCase(actions.setCurrentQuestion, (state, action) => {
    state.currentQuestion = action.payload;
  });

  builder.addCase(actions.setTimetook, (state, action) => {
    state.timetook = action.payload;
  })
})

export default reducer;