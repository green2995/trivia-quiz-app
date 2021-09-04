import { Trivia } from "../Interfaces/TriviaQuestion";
import localforage from "localforage"
import { LocalIdStore } from "../Utils/data/LocalIdStore";

const questionIdStore = new LocalIdStore("trivia_question_id");

export async function getFailedTrivias() {
  try {
    const data = await localforage.getItem<Record<string, FailedTrivia>>(TriviaFileSystemKeys.FAILED_TRIVIA_MAP)
    return data || {};
  } catch(e) {
    return {};
  }
}

export async function saveFailedTrivia(failed: FailedTrivia) {
  const prev = await getFailedTrivias();
  const id = await questionIdStore.getId(failed.trivia.question);

  return localforage.setItem(TriviaFileSystemKeys.FAILED_TRIVIA_MAP, {
    ...prev,
    [id]: failed,
  });
}

export async function removeFailedTrivia(question: string) {
  const prev = await getFailedTrivias();
  const id = await questionIdStore.getId(question);
  delete prev[id];
  
  return localforage.setItem(TriviaFileSystemKeys.FAILED_TRIVIA_MAP, prev);
}

export async function getTriviaScore() {
  try {
    const data = await localforage.getItem<TriviaScore>(TriviaFileSystemKeys.TRIVIA_SCORE);
    return data || {trial: 0, fail: 0, success: 0};
  } catch(e) {
    return {trial: 0, fail: 0, success: 0};
  }
}

export async function countSuccess() {
  const prev = await getTriviaScore();
  
  return localforage.setItem(TriviaFileSystemKeys.TRIVIA_SCORE, {
    ...prev,
    trial: prev.trial + 1,
    success: prev.success + 1,
  })
}

export async function countFail() {
  const prev = await getTriviaScore();
  
  return localforage.setItem(TriviaFileSystemKeys.TRIVIA_SCORE, {
    ...prev,
    trial: prev.trial + 1,
    fail: prev.fail + 1,
  })
}


export async function clearAll() {
  return localforage.clear();
}

const TriviaFileSystemKeys = {
  FAILED_TRIVIA_MAP: "failed_trivia_map",
  TRIVIA_SCORE: "trivia_score",
}

export type FailedTrivia = {
  trivia: Trivia,
  userAnswer: string
}

export type TriviaScore = {
  success: number,
  fail: number,
  trial: number,  
}
