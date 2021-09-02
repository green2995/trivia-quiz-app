import { createAction } from "@reduxjs/toolkit";
import { initialState, TriviaChatInitialState } from "./reducer";

export const setRecorods = createAction<TriviaChatInitialState["records"]>("setrecords");
export const setQuestions = createAction<TriviaChatInitialState["questions"]>("setquestions");
export const setCurrentQuestion = createAction<TriviaChatInitialState["currentQuestion"]>("setcurrentquestion");
export const setTimetook = createAction<TriviaChatInitialState["timetook"]>("settimetook");
export const setScore = createAction<TriviaChatInitialState["score"]>("setscore")