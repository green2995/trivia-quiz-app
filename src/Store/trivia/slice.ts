import { combineReducers } from "@reduxjs/toolkit";
import categories from "./categories/slice"

export const triviaReducer = combineReducers({
  categories,
})

export default triviaReducer