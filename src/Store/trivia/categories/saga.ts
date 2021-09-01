import { call, put, takeLatest } from "redux-saga/effects";
import TriviaAPI from "../../../Api/TriviaAPI";
import { TriviaCategory } from "../../../Interfaces/Category";
import { categoriesSlice } from "./slice";

function* fetchCategories() {
  try {
    const categories: TriviaCategory[] = yield call(TriviaAPI.fetchCategories);
    yield put(categoriesSlice.actions.loadCategories_success(categories))
  } catch (e) {
    yield put(categoriesSlice.actions.loadCategories_fail())
  }
}

function* watchFetchCategories() {
  yield takeLatest(categoriesSlice.actions.loadCategories, fetchCategories)
}

export default watchFetchCategories;