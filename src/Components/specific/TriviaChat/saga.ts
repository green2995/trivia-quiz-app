import { PayloadAction } from "@reduxjs/toolkit";
import _, { take } from "lodash";
import { all, call, delay, fork, put, select, takeEvery } from "redux-saga/effects";
import TriviaAPI from "../../../Api/TriviaAPI";
import { TriviaCategory } from "../../../Interfaces/Category";
import { Trivia } from "../../../Interfaces/TriviaQuestion";
import { TriviaFileSystem } from "../../../System";
import AsyncData from "../../../Utils/redux/AsyncData";
import { SliceAction } from "../../../Utils/redux/type";
import { SYSTEM_NICK, USER_NICK } from "./QuizChat";
import { TriviaChatState, TriviaChatSlice as slice } from "./slice"
import TriviaChatTestIds from "./testid";

type Actions = {
  [K in keyof typeof slice["actions"]]: SliceAction<typeof slice, K>
};

const SENDER_SYSTEM = {
  name: SYSTEM_NICK,
  imgUrl: "https://bit.ly/2V9JUKX"
}

const SENDER_USER = {
  name: USER_NICK,
}

function* loadQuestions({ payload: categorId }: Actions["loadQuestions"]) {
  const state: TriviaChatState = yield select();
  if (state.questions.data) return;

  yield put(slice.actions.setQuestions({
    data: undefined,
    error: false,
    loading: false,
  }))

  yield put(slice.actions.appendRecord({
    message: {
      type: "text",
      value: `카테고리 정보를 불러오고 있습니다.`,
    },
    sender: SENDER_SYSTEM,
    testid: TriviaChatTestIds.loadingCategory,
  }));

  const categories: TriviaCategory[] = yield call(TriviaAPI.fetchCategories);

  const selectedCategory = (() => {
    const shuffled = _.shuffle(categories);
    const randomOne = shuffled[0]

    if (categorId === undefined) {
      return randomOne;
    } else {
      return categories.find((item) => item.id === categorId) || randomOne;
    }
  })();

  yield put(slice.actions.setCategory(selectedCategory));

  yield put(slice.actions.setQuestions({
    data: [],
    error: false,
    loading: true,
  }))

  yield put(slice.actions.appendRecord({
    message: {
      type: "text",
      value: `[${selectedCategory.name}] 분야의 문제를 불러오고 있습니다`
    },
    sender: SENDER_SYSTEM,
    testid: TriviaChatTestIds.loadingQuestions,
  }));

  try {
    const questions: Trivia[] = yield call(TriviaAPI.fetchQuestions, 10, selectedCategory.id);
    yield put(slice.actions.loadQuestions_success(questions));
  } catch (e) {
    yield put(slice.actions.loadQuestions_fail());
  }
}


function* loadQuestions_success(action: Actions["loadQuestions_success"]) {
  yield put(slice.actions.setQuestions({
    data: action.payload,
    error: false,
    loading: false,
  }))

  yield put(slice.actions.appendRecord({
    sender: SENDER_SYSTEM,
    message: {
      type: "text",
      value: "유후~ 문제를 모두 불러왔습니다."
    },
    testid: TriviaChatTestIds.loadedQuestions,
  }));

  yield put(slice.actions.setInteractive("start"))
}

function* loadQuestions_fail(action: Actions["loadQuestions_fail"]) {
  yield put(slice.actions.setQuestions({
    data: undefined,
    error: true,
    loading: false,
  }))
}

function* startQuiz() {
  const state: TriviaChatState = yield select();
  if (!state.questions.data) return;

  yield put(slice.actions.setTime({
    start: Date.now(),
    end: -1,
  }));

  yield put(slice.actions.setInteractive("none"));
  yield put(slice.actions.appendRecord({
    sender: SENDER_USER,
    message: {
      type: "text",
      value: "크큭 다 맞춰버리갓어"
    }
  }))

  yield delay(800);
  yield put(slice.actions.retrieveQuestions());
}

function* retrieveQuestions() {
  const state: TriviaChatState = yield select();
  if (!state.questions.data) return;

  const i = state.currentQuestion.index;
  const questions = state.questions.data;
  if (!questions) return;
  const answerSet = [
    questions[i].correct_answer,
    ...questions[i].incorrect_answers,
  ]

  const shuffled = answerSet.length > 2 ? _.shuffle(answerSet) : answerSet;

  yield put(slice.actions.setCurrentQuestion({
    ...state.currentQuestion,
    answers: shuffled.filter((answer) => state.currentQuestion.submitted.indexOf(answer) === -1),
  }))

  yield put(slice.actions.appendRecord({
    sender: SENDER_SYSTEM,
    message: {
      type: "text",
      value: `[ ${i + 1}번 문제 ] ${questions[i].question}`,
      tag: "important"
    },
    testid: `${TriviaChatTestIds.questionRecord}-${i}`,
  }))

  yield put(slice.actions.setInteractive("select"))
}

function* submitAnswer(action: Actions["submitAnswer"]) {
  const state: TriviaChatState = yield select();
  const { answer, questionIndex } = action.payload;
  const i = state.currentQuestion.index;
  // If submitted answer is from completed question, do nothing.
  if (questionIndex !== i) return;
  // for blocking selection to be changed
  if (state.waitingResponse) return;
  // If has submitted exact answer, do nothing. (multi trial mode)
  if (state.currentQuestion.submitted.indexOf(answer) !== -1) return;

  yield put(slice.actions.setWaitingResponse(true));
  yield put(slice.actions.setInteractive("none"));

  yield put(slice.actions.setCurrentQuestion({
    ...state.currentQuestion,
    submitted: [...state.currentQuestion.submitted, answer],
  }));

  yield put(slice.actions.appendRecord({
    sender: SENDER_USER,
    message: {
      type: "text",
      value: answer
    }
  }))

  yield put(slice.actions.setScore({
    ...state.score,
    trial: state.score.trial + 1,
  }))

  yield delay(800);
  if (answer === state.questions.data![i].correct_answer) {
    yield put(slice.actions.answer_correct());
  } else {
    yield put(slice.actions.answer_incorrect());
  }
  yield put(slice.actions.setWaitingResponse(false));
}

function* answer_correct() {
  const state: TriviaChatState = yield select();
  yield call(TriviaFileSystem.countSuccess);

  const correct = state.questions.data![state.currentQuestion.index].correct_answer;
  yield put(slice.actions.appendRecord({
    sender: SENDER_SYSTEM,
    message: {
      type: "text",
      value: `${getRandomReaction("correct")} 정답은 ${correct} 입니다!`,
      tag: "positive",
    },
    testid: TriviaChatTestIds.reactionCorrect + `-${state.currentQuestion.index}`,
  }));

  yield put(slice.actions.setScore({
    ...state.score,
    success: state.score.success + 1,
  }))

  yield put(slice.actions.nextQuestion());
}

function* answer_incorrect() {
  const state: TriviaChatState = yield select();
  yield call(TriviaFileSystem.countFail);

  const cur = state.questions.data![state.currentQuestion.index];
  const correct = cur.correct_answer;

  yield put(slice.actions.appendRecord({
    sender: SENDER_SYSTEM,
    message: {
      type: "text",
      value: `${getRandomReaction("incorrect")} 정답은 ${correct} 입니다`,
      tag: "warning",
    },
    testid: TriviaChatTestIds.reactionFalse + `-${state.currentQuestion.index}`,
  }))

  yield put(slice.actions.setScore({
    ...state.score,
    fail: state.score.fail + 1,
  }))

  yield call(TriviaFileSystem.saveFailedTrivia, _.cloneDeep({
    category: state.category,
    trivia: cur,
    userAnswer: state.currentQuestion.submitted.slice(-1)[0],
  }))

  // single trial mode
  yield put(slice.actions.nextQuestion())

  // multi trial mode
  // yield put(slice.actions.retrieveQuestions())
}

function* nextQuestion() {
  const state: TriviaChatState = yield select();

  yield put(slice.actions.setCurrentQuestion({
    ...state.currentQuestion,
    index: state.currentQuestion.index + 1,
    answers: [],
    submitted: [],
  }))

  if (state.currentQuestion.index < state.questions.data!.length - 1) {
    yield put(slice.actions.setInteractive("next"))
  } else {
    yield put(slice.actions.completeQuiz())
  }
}

function* completeQuiz(){
  const state: TriviaChatState = yield select();
  yield put(slice.actions.setTime({
    ...state.time,
    end: Date.now(),
  }))

  yield delay(1000);
  yield put(slice.actions.setInteractiveVisibility(false));
  yield put(slice.actions.appendRecord({
    sender: SENDER_SYSTEM,
    message: {
      type: "text",
      value: "모든 문제를 완료했습니다."
    }
  }));

  yield put(slice.actions.setResultVisible(true));
}

function* retry() {
  const state: TriviaChatState = yield select();
  const prevScore = state.score.success / state.score.trial;
  yield put(slice.actions.resetPlay());
  yield put(slice.actions.setRecords([{
    sender: SENDER_SYSTEM,
    message: {
      type: "text",
      value: prevScore < 1
        ? "유후~ 이번엔 다 맞출 수 있겠죠?"
        : "오우 다 맞췄는데 또 하다니, 대단쓰",
    }
  }]));
  yield put(slice.actions.setInteractive("start"))
}

function* nextSet() {
  yield put(slice.actions.initialize());
  yield put(slice.actions.setRecords([{
    sender: SENDER_SYSTEM,
    message: {
      type: "text",
      value: "오~ 학구열이 대단하군요?! 좋아요 좋습니다",
    }
  }]))
}


function* resetPlay() {
  yield put(slice.actions.setResultVisible(false));
  yield put(slice.actions.setInteractive("none")); 
  yield put(slice.actions.setTime({
    start: 0,
    end: 0,
  }));
  yield put(slice.actions.setScore({
    fail: 0,
    trial: 0,
    success: 0,
  }))
  yield put(slice.actions.setCurrentQuestion({
    index: 0,
    answers: [],
    submitted: [],
  }))
}

function* initialize() {
  yield put(slice.actions.resetPlay());
  yield put(slice.actions.setQuestions({
    data: undefined,
    error: false,
    loading: false,
  }))
}

export function* triviaChatSaga() {
  yield takeEvery(slice.actions.loadQuestions, loadQuestions);
  yield takeEvery(slice.actions.loadQuestions_success, loadQuestions_success);
  yield takeEvery(slice.actions.loadQuestions_fail, loadQuestions_fail);
  yield takeEvery(slice.actions.startQuiz, startQuiz);
  yield takeEvery(slice.actions.retrieveQuestions, retrieveQuestions);
  yield takeEvery(slice.actions.submitAnswer, submitAnswer);
  yield takeEvery(slice.actions.answer_correct, answer_correct);
  yield takeEvery(slice.actions.answer_incorrect, answer_incorrect);
  yield takeEvery(slice.actions.nextQuestion, nextQuestion);
  yield takeEvery(slice.actions.completeQuiz, completeQuiz);
  yield takeEvery(slice.actions.retry, retry);
  yield takeEvery(slice.actions.nextSet, nextSet);
  yield takeEvery(slice.actions.resetPlay, resetPlay);
  yield takeEvery(slice.actions.initialize, initialize);
}

const reactions = {
  correct: [
    "딩동댕~",
    "맞아요 맞아",
    "예쓰! 그거 맞아요",
    "조금 아시네요?",
    "ㅊㅋㅊㅋ",
  ],
  incorrect: [
    "땡! 에휴 이걸 모르다니",
    "아쉽게도, 아닙니다만 크큭",
    "아.닙.니.다.",
    "땡 오답입니다",
    "크큭 틀리셨습니다",
  ],
}

function getRandomReaction(type: keyof typeof reactions) {
  return _.shuffle(reactions[type])[0]
}
