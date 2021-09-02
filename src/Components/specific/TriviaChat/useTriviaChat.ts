import React from "react";
import { useCurrent } from "../../../Hooks/useCurrent";
import { Trivia } from "../../../Interfaces/Trivia";
import { CustomEventEmitter } from "../../../Utils/event/CustomEventEmitter";
import { CustomSubject } from "../../../Utils/event/CustomSubject";
import TriviaChatReducer from "./reducer";
import { initialState, TriviaChatInitialState } from "./reducer/reducer";

export const USER_NICK = "user";
export const SYSTEM_NICK = "스템이";

export function useTriviaChat() {
  const actionEvent = useCurrent(new CustomEventEmitter<{
    loadQuestions: (category?: string) => void
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
    records: new CustomSubject<TriviaChatInitialState["records"]>([]),
    questions: new CustomSubject<TriviaChatInitialState["questions"]>({
      data: null,
      error: false,
      loading: false,
    }),
    currentQuestion: new CustomSubject<TriviaChatInitialState["currentQuestion"]>({
      index: 0,
      answers: [],
      submitted: []
    }),
    timetook: new CustomSubject<TriviaChatInitialState["timetook"]>(-1),

    //temporary state
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
