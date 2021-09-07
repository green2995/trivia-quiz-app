import { Trivia } from "../../../Interfaces/TriviaQuestion"
import AsyncData from "../../../Utils/redux/AsyncData"
import { ChatRecordProps } from "../../derivative/Chat/ChatRecord/ChatRecord"
import { makeAutoObservable, runInAction } from "mobx"
import { SYSTEM_NICK, USER_NICK } from "./QuizChat"
import TriviaChatTestIds from "./testid"
import { TriviaCategory } from "../../../Interfaces/Category"
import TriviaAPI from "../../../Api/TriviaAPI"
import _ from "lodash"
import { TriviaFileSystem } from "../../../System"

const SENDER_SYSTEM = {
  name: SYSTEM_NICK,
  imgUrl: "https://bit.ly/2V9JUKX"
}

const SENDER_USER = {
  name: USER_NICK,
}

class TriviaChatX {
  records = [] as ChatRecordProps[]
  interactive = "none" as "none" | "start" | "next" | "select"
  resultVisible = false
  randomCategory = false

  questions = AsyncData.getInitialState<Trivia[]>()
  currentQuestion = {
    index: 0,
    submitted: [] as string[],
    answers: [] as string[]
  }

  score = {
    trial: 0,
    success: 0,
    fail: 0
  }

  interactiveVisible = true

  category = {
    id: -1,
    name: ""
  }

  time = {
    start: -1,
    end: -1
  }

  waitingResponse = false

  constructor() {
    makeAutoObservable(this);
  }

  *loadQuestions(categoryId?: number) {
    if (this.questions.data) return;

    this.questions = {
      data: undefined,
      error: false,
      loading: false,
    }

    this.records.push({
      message: {
        type: "text",
        value: `카테고리 정보를 불러오고 있습니다.`,
      },
      sender: SENDER_SYSTEM,
      testid: TriviaChatTestIds.loadingCategory,
    })

    const categories: TriviaCategory[] = yield TriviaAPI.fetchCategories();

    const selectedCategory = (() => {
      const shuffled = _.shuffle(categories);
      const randomOne = shuffled[0]

      if (categoryId === undefined) {
        return randomOne;
      } else {
        return categories.find((item) => item.id === categoryId) || randomOne;
      }
    })();

    this.category = selectedCategory;
    this.questions = {
      data: [],
      error: false,
      loading: true,
    }

    this.records.push({
      message: {
        type: "text",
        value: `[${selectedCategory.name}] 분야의 문제를 불러오고 있습니다`
      },
      sender: SENDER_SYSTEM,
      testid: TriviaChatTestIds.loadingQuestions,
    })

    try {
      const questions: Trivia[] = yield TriviaAPI.fetchQuestions(10, selectedCategory.id);
      AsyncData.markSuccess(this.questions, questions);
      this.records.push({
        sender: SENDER_SYSTEM,
        message: {
          type: "text",
          value: "유후~ 문제를 모두 불러왔습니다."
        },
        testid: TriviaChatTestIds.loadedQuestions,
      })
      this.interactive = "start";
    } catch (e) {
      AsyncData.markError(this.questions);
    }
  }

  startQuiz = () => {
    if (!this.questions.data) return;

    this.time.start = Date.now();

    this.interactive = "none";
    this.records.push({
      sender: SENDER_USER,
      message: {
        type: "text",
        value: "크큭 다 맞춰버리갓어"
      }
    })

    setTimeout(() => {
      this.retrieveQuestions()
    }, 800)
  }

  retrieveQuestions = () => {
    if (!this.questions.data) return;

    const i = this.currentQuestion.index;
    const questions = this.questions.data;
    if (!questions) return;
    const answerSet = [
      questions[i].correct_answer,
      ...questions[i].incorrect_answers,
    ]

    const shuffled = answerSet.length > 2 ? _.shuffle(answerSet) : answerSet;

    this.currentQuestion.answers = shuffled.filter((answer) => this.currentQuestion.submitted.indexOf(answer) === -1)

    this.records.push({
      sender: SENDER_SYSTEM,
      message: {
        type: "text",
        value: `[ ${i + 1}번 문제 ] ${questions[i].question}`,
        tag: "important"
      },
      testid: `${TriviaChatTestIds.questionRecord}-${i}`,
    })

    this.interactive = "select";
  }

  submitAnswer = (questionIndex: number, answer: string) => {
    const i = this.currentQuestion.index;
    // If submitted answer is from completed question, do nothing.
    if (questionIndex !== i) return;
    // for blocking selection to be changed
    if (this.waitingResponse) return;
    // If has submitted exact answer, do nothing. (multi trial mode)
    if (this.currentQuestion.submitted.indexOf(answer) !== -1) return;

    this.waitingResponse = true;
    this.interactive = "none";

    this.currentQuestion.submitted.push(answer)

    this.records.push({
      sender: SENDER_USER,
      message: {
        type: "text",
        value: answer
      }
    })

    this.score.trial += 1;

    setTimeout(() => {
      if (answer === this.questions.data![i].correct_answer) {
        this.answer_correct();
      } else {
        this.answer_incorrect();
      }

      runInAction(() => {
        this.waitingResponse = false;
      })
    }, 800)
  }

  *answer_correct() {
    yield TriviaFileSystem.countSuccess();

    const correct = this.questions.data![this.currentQuestion.index].correct_answer;
    this.records.push({
      sender: SENDER_SYSTEM,
      message: {
        type: "text",
        value: `${getRandomReaction("correct")} 정답은 ${correct} 입니다!`,
        tag: "positive",
      },
      testid: TriviaChatTestIds.reactionCorrect + `-${this.currentQuestion.index}`,
    })

    this.score.success += 1;

    this.nextQuestion();
  }

  *answer_incorrect() {
    yield TriviaFileSystem.countFail();

    const cur = this.questions.data![this.currentQuestion.index];
    const correct = cur.correct_answer;

    this.records.push({
      sender: SENDER_SYSTEM,
      message: {
        type: "text",
        value: `${getRandomReaction("incorrect")} 정답은 ${correct} 입니다`,
        tag: "warning",
      },
      testid: TriviaChatTestIds.reactionFalse + `-${this.currentQuestion.index}`,
    })

    this.score.fail += 1;

    const failedTriviaData = _.cloneDeep({
      category: this.category,
      trivia: cur,
      userAnswer: this.currentQuestion.submitted.slice(-1)[0],
    });

    yield TriviaFileSystem.saveFailedTrivia(failedTriviaData)

    // single trial mode
    this.nextQuestion();

    // multi trial mode
    // this.retrieveQuestions();
  }

  nextQuestion = () => {
    this.currentQuestion = {
      ...this.currentQuestion,
      index: this.currentQuestion.index + 1,
      answers: [],
      submitted: [],
    }

    if (this.currentQuestion.index < this.questions.data!.length) {
      this.interactive = "next"
    } else {
      this.completeQuiz();
    }
  }

  completeQuiz = () => {
    this.time.end = Date.now();

    
    setTimeout(() => {
      runInAction(() => {
        this.interactiveVisible = false;
        this.records.push({
          sender: SENDER_SYSTEM,
          message: {
            type: "text",
            value: "모든 문제를 완료했습니다."
          }
        })
  
        this.resultVisible = true;
      })
    }, 800)
  }

  retry = () => {
    this.interactiveVisible = true;
    const prevScore = this.score.success / this.score.trial;
    this.resetPlay();
    this.records.push({
      sender: SENDER_SYSTEM,
      message: {
        type: "text",
        value: prevScore < 1
          ? "유후~ 이번엔 다 맞출 수 있겠죠?"
          : "오우 다 맞췄는데 또 하다니, 대단쓰",
      }
    })
    this.interactive = "start";
  }

  nextSet = (categoryId?: number) => {
    this.interactiveVisible = true;

    this.initialize();
    this.records.push({
      sender: SENDER_SYSTEM,
      message: {
        type: "text",
        value: "오~ 학구열이 대단하군요?! 좋아요 좋습니다",
      }
    })

    this.loadQuestions(categoryId);
  }
  
  resetPlay = () => {
    this.resultVisible = false;
    this.interactive = "none";
    this.time = {
      start: 0,
      end: 0,
    }

    this.score = {
      fail: 0,
      trial: 0,
      success: 0,
    }

    this.currentQuestion = {
      index: 0,
      answers: [],
      submitted: [],
    }

    this.records = [];
  }

  initialize = () => {
    this.resetPlay();
    this.questions = {
      data: undefined,
      error: false,
      loading: false,
    }
  }
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


export default TriviaChatX