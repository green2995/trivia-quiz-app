import React from "react"
import {fireEvent, render, screen, waitFor, } from "@testing-library/react"
import TriviaResult from "../TriviaResult"
import TriviaChatTestIds from "../../../../../specific/TriviaChat/testid"

describe("TriviaResult", () => {
  test("invoke callback properly", () => {
    const pressed = {
      next: false,
      quit: false,
      retry: false,
    };

    render(
      <TriviaResult
        onPressNext={() => pressed.next = true}
        onPressQuit={() => pressed.quit = true}
        onPressRetry={() => pressed.retry = true}
        score={{trial: -1, fail: -1, success: -1}}
        timetook={-1}
      />
    );

    fireEvent.click(screen.queryByTestId(TriviaChatTestIds.nextSetButton)!);
    fireEvent.click(screen.queryByTestId(TriviaChatTestIds.quitButton)!);
    fireEvent.click(screen.queryByTestId(TriviaChatTestIds.retryButton)!);

    expect(pressed.retry).toBe(true);
    expect(pressed.next).toBe(true);
    expect(pressed.quit).toBe(true);
  })
})
