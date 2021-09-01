import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TriviaCategory } from "../../../Interfaces/Category";
import AsyncData from "../../../Utils/redux/AsyncData";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: AsyncData.getInitialState<TriviaCategory[]>(),
  reducers: {
    loadCategories: (state) => {
      AsyncData.markLoad(state);
    },
    loadCategories_success: (state, action: PayloadAction<TriviaCategory[]>) => {
      AsyncData.markSuccess(state, action.payload);
    },
    loadCategories_fail: (state) => {
      AsyncData.markError(state);
    },
  },
})

export default categoriesSlice.reducer