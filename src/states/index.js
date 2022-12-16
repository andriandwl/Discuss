
import { configureStore } from '@reduxjs/toolkit'
import { initMessageListener } from 'redux-state-sync'
import { loadState, saveState } from './locale'
import mapReducer from './maps/reducer'

// const config = {}

// const middlewares = [createStateSyncMiddleware(config)]

const persistedState = loadState()

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(...middlewares)
//   // other store enhancers if any
// )

const store = configureStore({
  reducer:
    mapReducer,
  preloadedState: persistedState

})

store.subscribe(() => { saveState(store.getState()) })

initMessageListener(store)

export default store
