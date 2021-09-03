import React from "react";
import { useCurrent } from "../../../Hooks/useCurrent";
import { Trivia } from "../../../Interfaces/TriviaQuestion";
import { CustomEventEmitter } from "../../../Utils/event/CustomEventEmitter";
import { CustomSubject } from "../../../Utils/event/CustomSubject";
import TriviaChatReducer from "./reducer";
import { initialState, TriviaChatInitialState } from "./reducer/reducer";

export const USER_NICK = "user";
export const SYSTEM_NICK = "스템이";

export function useTriviaChat() {
  const actionEvent = useCurrent(new CustomEventEmitter<{
    loadQuestions: () => void
    startQuiz: () => void
    submitAnswer: (questionIndex: number, answer: string) => void
    nextQuestion: () => void
    retry: () => void
    quit: () => void
    nextSet: () => void
    resetPlay: () => void
    initialize: () => void
  }>());
  
  const reactionEvent = useCurrent(new CustomEventEmitter<{
    loadQuestions_success: (questions: Trivia[]) => void
    loadQuestions_fail: () => void

    retrieveQuestion: () => void

    answer_correct: () => void
    answer_incorrect: () => void

    completeQuiz: () => void
  }>());

  const sync = useCurrent({
    records: new CustomSubject(TriviaChatReducer.initialState.records),
    questions: new CustomSubject(TriviaChatReducer.initialState.questions),
    currentQuestion: new CustomSubject(TriviaChatReducer.initialState.currentQuestion),
    timetook: new CustomSubject(TriviaChatReducer.initialState.timetook),
    interactive: new CustomSubject(TriviaChatReducer.initialState.interactive),
    interactiveVisible: new CustomSubject(TriviaChatReducer.initialState.interactiveVisible),

    time: {
      start: -1,
      end: -1,
    },

    // after submitting answer
    waitingResponse: false,

    // record it, and when game completed, export it to reducer
    score: {
      trial: 0,
      success: 0,
      fail: 0,
    },

    category: {
      id: -1,
      name: "",
    }
  })

  const events = { action: actionEvent, reaction: reactionEvent };

  const [state, dispatch] = React.useReducer(TriviaChatReducer.reducer, TriviaChatReducer.initialState);

  return [
    state,
    events,
    dispatch,
    sync,
  ] as const;
}
