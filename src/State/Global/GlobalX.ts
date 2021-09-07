import { makeAutoObservable } from "mobx";
import TriviaAPI from "../../Api/TriviaAPI";
import { TriviaCategory } from "../../Interfaces/Category";
import AsyncData from "../../Utils/redux/AsyncData";

class GlobalX {
  categories = AsyncData.getInitialState<TriviaCategory[]>()

  constructor() {
    makeAutoObservable(this)
  }

  *fetchCategories() {
    try {
      const categories: TriviaCategory[] = yield TriviaAPI.fetchCategories();
      this.categories.data = categories;
      AsyncData.markSuccess(this.categories, categories);
    } catch(e) {
      AsyncData.markError(this.categories);
    }
  }
}

export default GlobalX;