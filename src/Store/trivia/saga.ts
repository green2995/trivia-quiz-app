import { all } from "@redux-saga/core/effects"
import watchFetchCategories from "./categories/saga";

export function* triviaSaga() {
  yield all([
    watchFetchCategories(),
  ])
}