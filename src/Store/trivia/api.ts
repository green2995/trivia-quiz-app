import { FetchTriviaCategoryResponse, TriviaCategory } from "../../Interfaces/Category";

const api = {
  async fetchCategories(): Promise<TriviaCategory[]> {
    const res = await fetch("https://opentdb.com/api_category.php").then((res) => res.json()) as FetchTriviaCategoryResponse
    return res.trivia_categories;
  }
}

export default api;