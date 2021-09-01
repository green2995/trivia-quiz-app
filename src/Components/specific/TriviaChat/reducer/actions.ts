import { createAction } from "@reduxjs/toolkit";
import { initialState } from "./reducer";

export const setRecorods = createAction<typeof initialState["records"]>("setrecords");
export const setQuestions = createAction<typeof initialState["questions"]>("setquestions");
export const setCurrentQuestion = createAction<typeof initialState["currentQuestion"]>("setcurrentquestion");
