import { combineReducers } from "redux";
import triviaReducer from "./trivia/reducer"
import { all } from "redux-saga/effects"
import { triviaSaga } from "./trivia/saga";

const rootReducer = combineReducers({
  trivia: triviaReducer,
})

export default rootReducer;

export function* rootSaga() {
  yield all([
    triviaSaga()
  ])
}