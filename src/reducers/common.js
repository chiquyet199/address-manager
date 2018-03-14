import { TOGGLE_LOADING, SERVER_ERROR } from 'actions/common'

const initialState = {
  isLoading: false,
  errorHistory: [],
}

const actionHandlers = {}

actionHandlers[TOGGLE_LOADING] = (state, boolVal) => {
  return { ...state, isLoading: boolVal }
}

actionHandlers[SERVER_ERROR] = (state, err) => {
  return { ...state, errorHistory: [...state.errorHistory, err] }
}

export default (state = initialState, action) => {
  var handler = actionHandlers[action.type]
  if (handler) return handler(state, action.payload)
  return state
}
