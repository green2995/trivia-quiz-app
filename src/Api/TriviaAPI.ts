import { FetchTriviaCategoryResponse, TriviaCategory } from "../Interfaces/Category";
import { FetchTriviaResponse, Trivia } from "../Interfaces/Trivia";
import axios from "axios";

const TriviaAPI = {
  
  async fetchCategories(): Promise<TriviaCategory[]> {
    const res = await axios.get<FetchTriviaCategoryResponse>(
      "https://opentdb.com/api_category.php",
      {}
    );
    return res.data.trivia_categories;
  },

  async fetchQuestions(amount: number, category?: string): Promise<Trivia[]> {
    const res = await axios.get<FetchTriviaResponse>(
      "https://opentdb.com/api.php",
      {
        params: {
          amount,
          category,
          encode: "url3986"
        }
      }
    )
      
    const questions = res.data.results.map((result) => {
      return {
        ...result,
        category: decodeURIComponent(result.category),
        incorrect_answers: result.incorrect_answers.map(decodeURIComponent),
        correct_answer: decodeURIComponent(result.correct_answer),
        question: decodeURIComponent(result.question),
      }
    })

    return questions;
  }
}

export default TriviaAPI