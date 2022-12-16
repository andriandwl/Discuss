import { withReduxStateSync } from 'redux-state-sync'
import { loadState } from '../locale'
import { ActionType } from './action'

const mapReducer = (state = loadState(), action) => {
  switch (action.type) {
    case ActionType.SET_MAP_CENTER: {
      const { mapCenter } = action.payload.mapCenter
      return { ...state, mapCenter }
    }
    case ActionType.SET_AUTOCOMPLETE_VALUE: {
      const { autocompleteValue } = action.payload.autocompleteValue
      return { ...state, autocompleteValue }
    }
    case ActionType.SET_ZOOM: {
      const { zoom } = action.payload.zoom
      return { ...state, zoom }
    }
    case ActionType.SET_HISTORY: {
      const { history } = action.payload.history
      return { ...state, history }
    }
    default:
      return { ...state }
  }
}

export default withReduxStateSync(mapReducer)
