import { TriviaChatInitialState } from "../Components/specific/TriviaChat/slice";
import { TriviaCategory } from "../Interfaces/Category";
import { Trivia } from "../Interfaces/TriviaQuestion";
import localforage from "localforage"

export async function saveInccorectAnswer(incorrectAnswer: FailedTrivia) {
  const prev = await getInccorectAnswers();

  return localforage.setItem(TriviaFileSystemKeys.INCORRECT_ANSWERS, [
    ...prev,
    incorrectAnswer
  ]);
}

export async function saveTriviaResult(result: TriviaResult) {
  const prev = await getTriviaResults();
  
  return localforage.setItem(TriviaFileSystemKeys.TRIVIA_RESULTS, [
    ...prev,
    result
  ])
}

export async function getTriviaResults() {
  try {
    const data = await localforage.getItem<TriviaResult[]>(TriviaFileSystemKeys.TRIVIA_RESULTS);
    return data || [];
  } catch(e) {
    return [];
  }
}

export async function getInccorectAnswers() {
  try {
    const data = await localforage.getItem<FailedTrivia[]>(TriviaFileSystemKeys.INCORRECT_ANSWERS)
    return data || [];
  } catch(e) {
    return [];
  }
}

export async function clearAll() {
  return localforage.clear();
}

const TriviaFileSystemKeys = {
  INCORRECT_ANSWERS: "incorrect_answers",
  TRIVIA_RESULTS: "trivia_results",
}

export type FailedTrivia = {
  category: TriviaCategory,
  trivia: Trivia,
  userAnswer: string
}

export type TriviaResult = {
  category: TriviaCategory,
  score: TriviaChatInitialState["score"],
  timetook: number
}

