import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TriviaCategory } from "../../Interfaces/Category";
import { Trivia } from "../../Interfaces/Trivia";

export const triviaSlice = createSlice({
  name: "trivia",
  initialState: {
    categories: {
      loading: false,
      error: false,
      data: [] as TriviaCategory[],
    },
    questions: [] as Trivia[]
  },
  reducers: {
    loadCategories: (state) => {
      state.categories.loading = true;
      state.categories.error = false;
    },
    loadCategories_success: (state, action: PayloadAction<TriviaCategory[]>) => {
      state.categories.data = action.payload;
      state.categories.loading = false;
    },
    loadCategories_fail: (state) => {
      state.categories.loading = false;
      state.categories.error = true;
    },
  },
})

export default triviaSlice.reducer