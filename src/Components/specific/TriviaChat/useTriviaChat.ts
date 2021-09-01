import React from "react";
import { useCurrent } from "../../../Hooks/useCurrent";
import { Trivia } from "../../../Interfaces/Trivia";
import { CustomEventEmitter } from "../../../Utils/event/CustomEventEmitter";
import { CustomSubject } from "../../../Utils/event/CustomSubject";
import { ChatRecordProps } from "../../derivative/Chat/ChatRecord";
import TriviaChatReducer from "./reducer";
import { initialState } from "./reducer/reducer";

export const USER_NICK = "user";
export const SYSTEM_NICK = "스템이";

export function useTriviaChat() {
  const actionEvent = useCurrent(new CustomEventEmitter<{
    loadQuestions: (category?: string) => void
    startQuiz: () => void
    submitAnswer: (questionIndex: number, answer: string) => void
    nextQuestion: () => void
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
    records: new CustomSubject<typeof initialState["records"]>([]),
    questions: new CustomSubject<typeof initialState["questions"]>({
      data: [],
      error: false,
      loading: false,
    }),
    currentQuestion: new CustomSubject<typeof initialState["currentQuestion"]>({
      index: 0,
      answers: [],
      submitted: []
    })
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
