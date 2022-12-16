import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { initMessageListener } from 'redux-state-sync'
import mapReducer from './mapState'
import mapSaga from './mapSaga'

// const config = {}

// const middlewares = [createStateSyncMiddleware(config)]

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(...middlewares)
//   // other store enhancers if any
// )

const saga = createSagaMiddleware()

const store = configureStore({
  reducer: {
    maps: mapReducer
  },
  middleware: [saga]
})

saga.run(mapSaga)

initMessageListener(store)

export default store
