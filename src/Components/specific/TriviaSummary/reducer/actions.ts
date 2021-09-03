import { createAction } from "@reduxjs/toolkit";
import { TriviaFileSystem } from "../../../../System";

export const setIncorrectAnswers = createAction<TriviaFileSystem.IncorrectAnswer[]>("setincorrectanswers");
export const setTriviaResults = createAction<TriviaFileSystem.TriviaResult[]>("settriviaresults");