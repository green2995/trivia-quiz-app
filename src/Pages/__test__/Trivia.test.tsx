import React from "react"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"
import { render, waitFor, screen, fireEvent } from "@testing-library/react"
import App from "../../App"
import TriviaPageTestIds from "../Trivia/testid"
import TriviaChatTestIds from "../../Components/specific/TriviaChat/testid"

function waitFor5000<T>(callback: () => T) {
  return waitFor(callback, { timeout: 5000 })
}

function waitStartButton() {
  return waitFor5000(() => {
    expect(screen.getByTestId(TriviaChatTestIds.startButton)).toBeInTheDocument();
  })
}

const correctAnswerMatcher = new RegExp(TriviaChatTestIds.correctAnswer);
const falseAnswerMatcher = new RegExp(TriviaChatTestIds.falseAnswer);
const correctReactionMatcher = new RegExp(TriviaChatTestIds.reactionCorrect);
const falseReactionMatcher = new RegExp(TriviaChatTestIds.reactionFalse);
const nextButtonMatcher = new RegExp(TriviaChatTestIds.nextButton);
const nextSetButtonMatcher = new RegExp(TriviaChatTestIds.nextSetButton);
const quitButtonMatcher = new RegExp(TriviaChatTestIds.quitButton);
const retryButtonMatcher = new RegExp(TriviaChatTestIds.retryButton);
const scoreTextMatcher = new RegExp(TriviaChatTestIds.scoreText);

const QUESTION_SET_SIZE = 10;

describe("Trivia Page", () => {
  beforeEach(async () => {
    const history = createBrowserHistory();
    history.push("/trivia?category=Random")

    render(
      <Router history={history}>
        <App />
      </Router>
    )

    await waitFor5000(() => {
      expect(screen.getByTestId(TriviaPageTestIds.container)).toBeInTheDocument();
    })
  });

  test("load questions and categories on page loaded", async () => {
    await waitFor5000(() => {
      expect(screen.getByTestId(TriviaChatTestIds.loadingCategory)).toBeInTheDocument()
      expect(screen.getByTestId(TriviaChatTestIds.loadingQuestions)).toBeInTheDocument()
      expect(screen.getByTestId(TriviaChatTestIds.loadedQuestions)).toBeInTheDocument()
    })
  });

  test("retrieve question on press start quiz", async () => {
    await waitStartButton();

    fireEvent.click(screen.getByTestId(TriviaChatTestIds.startButton));

    const questionRecordMatcher = new RegExp(TriviaChatTestIds.questionRecord);

    await waitFor5000(() => {
      expect(screen.queryByTestId(questionRecordMatcher)).toBeInTheDocument();
    })
  })

  test("can choose an answer among choices", async () => {
    await waitStartButton();

    fireEvent.click(screen.getByTestId(TriviaChatTestIds.startButton));

    await waitFor5000(() => {
      expect(screen.queryByTestId(correctAnswerMatcher)).toBeInTheDocument();
    });

    const correctAnswer = screen.queryByTestId(correctAnswerMatcher);

    fireEvent.click(correctAnswer!);

    await waitFor5000(() => {
      expect(screen.queryByTestId(correctReactionMatcher)).toBeInTheDocument();
    })

    expect(screen.queryByTestId(correctReactionMatcher)?.textContent!.match(/정답은.+입니다\!/)).not.toBeNull();
  })

  test("overall quiz behavior: proceed, scoring, result", async () => {
    await waitStartButton();

    const startButton = screen.queryByTestId(TriviaChatTestIds.startButton);
    fireEvent.click(startButton!);

    // choose correct answer for half of questions
    for (let i = 0; i < QUESTION_SET_SIZE; i += 1) {
      const choiceMatcher = i % 2 === 0 ? correctAnswerMatcher : falseAnswerMatcher;
      const responseMatcher = i % 2 === 0
        ? new RegExp(`${TriviaChatTestIds.reactionCorrect}-${i}`)
        : new RegExp(`${TriviaChatTestIds.reactionFalse}-${i}`);

      await waitFor5000(() => {
        expect(screen.queryAllByTestId(choiceMatcher)[0]).toBeInTheDocument();
      });

      const choiceButton = screen.queryAllByTestId(choiceMatcher)[0];
      fireEvent.click(choiceButton!);

      await waitFor5000(() => {
        expect(screen.queryByTestId(responseMatcher)).toBeInTheDocument();
      });

      if (i < QUESTION_SET_SIZE - 1) {
        await waitFor5000(() => {
          expect(screen.queryByTestId(nextButtonMatcher)).toBeInTheDocument();
        });

        const nextButton = screen.queryByTestId(nextButtonMatcher);
        fireEvent.click(nextButton!);
      }
    }

    await waitFor5000(() => {
      expect(screen.queryByTestId(scoreTextMatcher)).toBeInTheDocument();
      expect(screen.queryByTestId(retryButtonMatcher)).toBeInTheDocument();
      expect(screen.queryByTestId(quitButtonMatcher)).toBeInTheDocument();
      expect(screen.queryByTestId(nextSetButtonMatcher)).toBeInTheDocument();
    });

    const scoreText = screen.queryByTestId(scoreTextMatcher)
    expect(scoreText!.textContent).toBe(`점수: ${Math.floor(QUESTION_SET_SIZE / 2) / QUESTION_SET_SIZE * 100}점`);
  })
})
