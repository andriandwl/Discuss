import { withReduxStateSync } from 'redux-state-sync'
import { loadState } from '../locale'
import { ActionType } from './action'

const mapReducer = (state = loadState(), action) => {
  switch (action.type) {
    case ActionType.SET_MAP_CENTER: {
      const { mapCenter } = action
      return { ...state, mapCenter }
    }
    case ActionType.SET_AUTOCOMPLETE_VALUE: {
      const { autocompleteValue } = action
      return { ...state, autocompleteValue }
    }
    case ActionType.SET_ZOOM: {
      const { zoom } = action
      return { ...state, zoom }
    }
    case ActionType.ADD_HISTORY: {
      const { history } = action
      return { ...state, history: [...state.history, history] }
    }
    default:
      return { ...state }
  }
}

export default withReduxStateSync(mapReducer)
