export interface FetchTriviaCategoryResponse {
  trivia_categories: TriviaCategory[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}