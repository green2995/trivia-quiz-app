import * as actions from "./actions"
import {default as reducer, initialState} from "./reducer"

const TriviaChatReducer = {
  initialState,
  reducer,
  actions,
}

export default TriviaChatReducer