import * as actions from "./actions"
import {default as reducer, initialState} from "./reducer"

const TriviaSummaryReducer = {
  initialState,
  reducer,
  actions,
}

export default TriviaSummaryReducer