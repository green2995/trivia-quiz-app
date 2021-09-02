import React from 'react'
import { useHistory } from 'react-router';
import TriviaAPI from '../../../Api/TriviaAPI';
import { shuffle } from '../../../Utils/array/shuffle';
import TriviaChatReducer from './reducer';
import { SYSTEM_NICK, USER_NICK, useTriviaChat } from './useTriviaChat';

const SENDER_SYSTEM = {
  name: SYSTEM_NICK,
  imgUrl: "https://bit.ly/2V9JUKX"
}

const SENDER_USER = {
  name: USER_NICK,
}

const EventHandler = (props: EventHandlerProps) => {
  const history = useHistory();
  const { event, dispatch, sync } = props;

  React.useEffect(() => {
    console.log(sync.questions.value)

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
      sync.timetook.on((next) => {
        dispatch(TriviaChatReducer.actions.setTimetook(next));
      }),

      // LOAD_QUESTIONS
      event.action.addListener("loadQuestions", async (category) => {
        if (sync.questions.value.data) return;

        sync.questions.set({
          data: [],
          error: false,
          loading: true,
        });

        sync.records.set((prev) => [
          ...prev,
          {
            message: {
              type: "text",
              value: "문제를 불러오고 있습니다"
            },
            sender: SENDER_SYSTEM
          }
        ])

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
            sender: SENDER_SYSTEM,
            message: {
              type: "text",
              value: "유후~ 문제를 모두 불러왔습니다."
            },
          },
          {
            sender: SENDER_SYSTEM,
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
        sync.time.start = Date.now()
        sync.records.set((prev) => [
          ...prev.slice(0, -1),
          {
            sender: SENDER_USER,
            message: {
              type: "text",
              value: "크큭 다 맞춰버리갓어"
            }
          }
        ]);

        setTimeout(() => {
          event.reaction.emit("retrieveQuestion");          
        }, 800);
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
            sender: SENDER_SYSTEM,
            message: {
              type: "text",
              value: `[ ${i + 1}번 문제 ] ${questions[i].question}`,
              tag: "important"
            },
          },
          {
            sender: SENDER_SYSTEM,
            message: {
              type: "selection",
              value: {
                choices: sync.currentQuestion.value.answers,
                onSelect: (selected) => {
                  event.action.emit("submitAnswer", i, selected);
                },
                correct: questions[i].correct_answer
              }
            }
          }
        ])
      }),

      event.action.addListener("submitAnswer", (questionIndex, answer) => {
        const i = sync.currentQuestion.value.index;
        // If submitted answer is from completed question, do nothing.
        if (questionIndex !== i) return;
        // for blocking selection to be changed
        if (sync.waitingResponse) return;
        // If has submitted exact answer, do nothing. (multi trial mode)
        if (sync.currentQuestion.value.submitted.indexOf(answer) !== -1) return;

        sync.waitingResponse = true;

        sync.currentQuestion.set((prev) => ({
          ...prev,
          submitted: [...prev.submitted, answer]
        }))

        // sync.records.set((prev) => [
        //   ...prev.slice(0, -1),
        // ])

        sync.records.set((prev) => [
          ...prev,
          {
            sender: SENDER_USER,
            message: {
              type: "text",
              value: answer
            }
          }
        ])

        sync.score.trial += 1;

        const questions = sync.questions.value.data;
        if (!questions) return console.warn("there's no questions loaded");

        setTimeout(() => {
          if (answer === questions[i].correct_answer) {
            event.reaction.emit("answer_correct");
          } else {
            event.reaction.emit("answer_incorrect");
          }

          sync.waitingResponse = false;
        }, 800)
      }),

      event.reaction.addListener("answer_correct", () => {
        const correct = sync.questions.value.data![sync.currentQuestion.value.index].correct_answer;
        sync.records.set((prev) => [
          ...prev,
          {
            sender: SENDER_SYSTEM,
            message: {
              type: "text",
              value: `${getRandomReaction("correct")} 정답은 ${correct} 입니다!`,
              tag: "positive",
            }
          }
        ])

        sync.score.success += 1;

        event.action.emit("nextQuestion");
      }),

      event.reaction.addListener("answer_incorrect", () => {
        const correct = sync.questions.value.data![sync.currentQuestion.value.index].correct_answer;
        sync.records.set((prev) => [
          ...prev,
          {
            sender: SENDER_SYSTEM,
            message: {
              type: "text",
              value: `${getRandomReaction("incorrect")} 정답은 ${correct} 입니다`,
              tag: "warning",
            }
          },
        ]);

        sync.score.fail += 1;

        // single trial mode
        event.action.emit("nextQuestion");

        // multi trial mode
        // event.reaction.emit("retrieveQuestion");
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
              sender: SENDER_USER,
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
        sync.time.end = Date.now();
        sync.timetook.set(sync.time.end - sync.time.start);
        dispatch(TriviaChatReducer.actions.setScore(sync.score))

        sync.records.set((prev) => [
          ...prev,
          {
            sender: SENDER_SYSTEM,
            message: {
              type: "text",
              value: "모든 문제를 완료했습니다."
            }
          }
        ])

        sync.records.set((prev) => [
          ...prev,
          {
            sender: SENDER_SYSTEM,
            message: {
              type: "triviaResult",
              value: {
                score: sync.score,
                timetook: sync.timetook.value,
                onPressRetry: () => {
                  event.action.emit("retry");
                },
                onPressQuit: () => {
                  event.action.emit("quit");
                },
                onPressNext: () => {
                  event.action.emit("nextSet");
                }
              }
            }
          }
        ])
      }),

      event.action.addListener("retry", () => {
        const prevScore = sync.score.success / sync.score.trial;

        event.action.emit("resetPlay");

        sync.records.set([
          {
            sender: SENDER_SYSTEM,
            message: {
              type: "text",
              value: prevScore < 1
                ? "유후~ 이번엔 다 맞출 수 있겠죠?"
                : "오우 다 맞췄는데 또 하다니, 대단쓰",
            }
          },
          {
            sender: SENDER_SYSTEM,
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

      event.action.addListener("quit", () => {
        history.push("/home");
      }),

      event.action.addListener("nextSet", () => {
        event.action.emit("initialize");
        sync.records.set((prev) => [
          ...prev,
          {
            sender: SENDER_SYSTEM,
            message: {
              type: "text",
              value: "오~ 학구열이 대단하군요?! 좋아요 좋습니다",
            }
          }
        ])
        event.action.emit("loadQuestions");
      }),

      event.action.addListener("resetPlay", () => {
        sync.time.start = 0;
        sync.time.end = 0;
        sync.timetook.set(-1);

        sync.score = {
          fail: 0,
          success: 0,
          trial: 0,
        };

        sync.currentQuestion.set({
          index: 0,
          answers: [],
          submitted: [],
        });
      }),

      event.action.addListener("initialize", () => {
        event.action.emit("resetPlay");
        sync.questions.set({
          data: null,
          error: false,
          loading: false,
        });
        sync.records.set([]);
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
