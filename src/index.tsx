import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import createSagaMiddleware from "redux-saga"
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer, { rootSaga } from './Store';
import { Responsive } from './Context';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware)
  )
)

export type RootState = ReturnType<typeof store["getState"]>;

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Responsive.Context>
      <Routes />
    </Responsive.Context>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
