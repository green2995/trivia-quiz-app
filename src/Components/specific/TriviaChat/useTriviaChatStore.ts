import React from "react";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga"
import { useCurrent } from "../../../Hooks/useCurrent";
import { triviaChatSaga } from "./saga";
import { TriviaChatSlice } from "./slice"

const sagaMiddleware = createSagaMiddleware();

export function useTriviaChatStore() {
  const store = useCurrent(createStore(
    TriviaChatSlice.reducer,
    compose(
      applyMiddleware(sagaMiddleware)
    )
  ));

  const task = sagaMiddleware.run(triviaChatSaga);

  React.useEffect(() => {
    return () => {
      task.cancel();
    }
  })

  return store;
}