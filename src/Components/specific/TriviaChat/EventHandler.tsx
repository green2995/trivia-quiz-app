import React from 'react'
import TriviaAPI from '../../../Api/TriviaAPI';
import { shuffle } from '../../../Utils/array/shuffle';
import TriviaChatReducer from './reducer';
import { SYSTEM_NICK, USER_NICK, useTriviaChat } from './useTriviaChat';

const EventHandler = (props: EventHandlerProps) => {
  const { event, dispatch, sync } = props;

  React.useEffect(() => {
    const unsubscribers = [
      sync.currentQuestion.on((next) => {
        dispatch(TriviaChatReducer.actions.setCurrentQuestion(next));
      }),
      sync.questions.on((next) => {
        dispatch(TriviaChatReducer.actions.setQuestions(next));
      }),
      sync.records.on((next) => {
        dispatch(TriviaChatReducer.actions.setRecorods(next));
      }),
      sync.time.on((next) => {
        dispatch(TriviaChatReducer.actions.setTime(next));
      }),

      // LOAD_QUESTIONS
      event.action.addListener("loadQuestions", async (category) => {
        sync.questions.set((prev) => ({
          ...prev,
          error: false,
          loading: true,
        }));

        try {
          const questions = await TriviaAPI.fetchQuestions(10, category);
          event.reaction.emit("loadQuestions_success", questions);
        } catch (e) {
          event.reaction.emit("loadQuestions_fail");
        }
      }),

      event.reaction.addListener("loadQuestions_success", (questions) => {
        sync.questions.set({
          data: questions,
          error: false,
          loading: false,
        });

        sync.records.set((prev) => [
          ...prev,
          {
            sender: SYSTEM_NICK,
            message: {
              type: "button",
              value: "퀴즈 시작",
              onClick: () => {
                event.action.emit("startQuiz");
              },
            }
          }
        ]);
      }),

      event.reaction.addListener("loadQuestions_fail", () => {
        sync.questions.set({
          data: [],
          error: true,
          loading: false,
        })
      }),

      // PLAY_QUIZ
      event.action.addListener("startQuiz", () => {
        if (!sync.questions.value.data) return;
        sync.time.set({ start: Date.now(), end: -1 });
        sync.records.set((prev) => prev.slice(0, -1));
        event.reaction.emit("retrieveQuestion");
      }),

      event.reaction.addListener("retrieveQuestion", () => {
        if (!sync.questions.value.data) return;

        const i = sync.currentQuestion.value.index;
        const questions = sync.questions.value.data;

        const answerSet = [
          questions[i].correct_answer,
          ...questions[i].incorrect_answers,
        ]

        const shuffled = answerSet.length > 2 ? shuffle(answerSet) : answerSet;

        sync.currentQuestion.set((prev) => ({
          ...prev,
          answers: shuffled.filter((answer) => prev.submitted.indexOf(answer) === -1),
        }))

        sync.records.set((prev) => [
          ...prev,
          {
            sender: SYSTEM_NICK,
            message: {
              type: "text",
              value: `[ ${i + 1}번 문제 ] ${questions[i].question}`,
              tag: "important"
            },
          },
          {
            sender: SYSTEM_NICK,
            message: {
              type: "selection",
              value: sync.currentQuestion.value.answers,
              onSelect: (selected) => {
                event.action.emit("submitAnswer", i, selected);
              }
            }
          }
        ])
      }),

      event.action.addListener("submitAnswer", (questionIndex, answer) => {
        const i = sync.currentQuestion.value.index;

        // If submitted answer is from completed question, do nothing.
        if (questionIndex !== i) return;
        if (sync.currentQuestion.value.submitted.indexOf(answer) !== -1) return;

        sync.currentQuestion.set((prev) => ({
          ...prev,
          submitted: [...prev.submitted, answer]
        }))

        sync.records.set((prev) => [
          ...prev.slice(0, -1),
        ])

        sync.records.set((prev) => [
          ...prev,
          {
            sender: USER_NICK,
            message: {
              type: "text",
              value: answer
            }
          }
        ])


        const questions = sync.questions.value.data;
        if (!questions) return console.warn("there's no questions loaded");

        setTimeout(() => {
          if (answer === questions[i].correct_answer) {
            event.reaction.emit("answer_correct");
          } else {
            event.reaction.emit("answer_incorrect");
          }
        }, 800)
      }),

      event.reaction.addListener("answer_correct", () => {
        const correct = sync.questions.value.data![sync.currentQuestion.value.index].correct_answer;
        sync.records.set((prev) => [
          ...prev,
          {
            sender: SYSTEM_NICK,
            message: {
              type: "text",
              value: `${getRandomReaction("correct")} 정답은 ${correct} 입니다!`,
              tag: "positive",
            }
          }
        ])

        event.action.emit("nextQuestion");
      }),

      event.reaction.addListener("answer_incorrect", () => {
        const correct = sync.questions.value.data![sync.currentQuestion.value.index].correct_answer;
        sync.records.set((prev) => [
          ...prev,
          {
            sender: SYSTEM_NICK,
            message: {
              type: "text",
              value: `${getRandomReaction("incorrect")} 정답은 ${correct} 입니다!`,
              tag: "warning",
            }
          },
        ]);

        event.action.emit("nextQuestion");
      }),

      event.action.addListener("nextQuestion", () => {
        sync.currentQuestion.set((prev) => ({
          ...prev,
          index: prev.index + 1,
          answers: [],
          submitted: [],
        }));

        if (sync.currentQuestion.value.index < sync.questions.value.data!.length) {
          sync.records.set((prev) => [
            ...prev,
            {
              sender: USER_NICK,
              message: {
                type: "button",
                onClick: () => {
                  sync.records.set((prev) => prev.slice(0, -1));
                  event.reaction.emit("retrieveQuestion")
                },
                value: "다음 문제"
              }
            }
          ])
        } else {
          event.reaction.emit("completeQuiz");
        }
      }),

      event.reaction.addListener("completeQuiz", () => {
        sync.time.set((prev) => ({ ...prev, end: Date.now() }));

        sync.records.set((prev) => [
          ...prev,
          {
            sender: SYSTEM_NICK,
            message: {
              type: "text",
              value: "모든 문제를 완료했습니다."
            }
          }
        ])

        sync.records.set((prev) => [
          ...prev,
          {
            sender: SYSTEM_NICK,
            message: {
              type: "jsx",
              value: (
                <div>
                </div>
              )
            }
          }

        ])
      }),
    ]

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe())
    }

  }, [])


  return <></>
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
  return shuffle(reactions[type])[0]
}

type EventHandlerProps = {
  event: ReturnType<typeof useTriviaChat>[1]
  dispatch: ReturnType<typeof useTriviaChat>[2]
  sync: ReturnType<typeof useTriviaChat>[3]
}

export default EventHandler
