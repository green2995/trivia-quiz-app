import { all, call, put, takeLatest } from "@redux-saga/core/effects"

import { triviaSlice } from "./slice"
import api from "./api"
import { TriviaCategory } from "../../Interfaces/Category";

function* fetchCategories() {
  try {
    const categories: TriviaCategory[] = yield call(api.fetchCategories);
    yield put(triviaSlice.actions.loadCategories_success(categories))
  } catch (e) {
    yield put(triviaSlice.actions.loadCategories_fail())
  }
}

export function* watchFetchCategories() {
  yield takeLatest(triviaSlice.actions.loadCategories, fetchCategories)
}

export function* triviaSaga() {
  yield all([
    watchFetchCategories,
  ])
}