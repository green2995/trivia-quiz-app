import React from "react"
import { render, act, waitFor, screen, fireEvent } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  beforeEach(async() => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId("category-item-random")).toBeInTheDocument();
    }, {timeout: 5000})
  })

  test("renders categories and summary", async() => {
    expect(screen.getByTestId("category-item-random")).toBeInTheDocument();
    expect(screen.getByTestId("category-item-generalknowledge")).toBeInTheDocument();
    expect(screen.getByTestId("category-item-entertainment:books")).toBeInTheDocument();
    expect(screen.getByTestId("trivia-summary")).toBeInTheDocument();
  })

  test("can go to trivia quiz page", async() => {
    fireEvent.click(screen.getByTestId("category-item-random"));
    await waitFor(() => {
      expect(screen.getByTestId("trivia-page-container")).toBeInTheDocument();
    }, {timeout: 5000});
  })
})

