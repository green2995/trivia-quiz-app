import { combineReducers } from "redux";
import triviaReducer from "./trivia/slice"
import { all } from "redux-saga/effects"
import { triviaSaga, watchFetchCategories } from "./trivia/saga";

const rootReducer = combineReducers({
  trivia: triviaReducer,
})

export default rootReducer;

export function* rootSaga() {
  yield all([
    watchFetchCategories()
  ])
}