import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { REVERSE_URL, GOOGLE_API } from '../utils/api/constants'
import { getAutoCompleteValueSuccess, getHistorySuccess, getMapCenterSuccess } from './mapState'

const dummy = {
  mapCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  autocompleteValue: '',
  zoom: 10,
  customMarkersArray: [],
  history: []
}

function * workGetMapsFetch () {
  const URL = `${REVERSE_URL}latlng=${dummy.mapCenter.lat},${dummy.mapCenter.lng}&sensor=true&key=${GOOGLE_API}`
  const response = yield call(axios, URL)

  const result = response.result

  const mapCenter = {
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng
  }
  yield put(getMapCenterSuccess(mapCenter))

  const autocompleteValue = result.formatted_address
  yield put(getAutoCompleteValueSuccess(autocompleteValue))

  const history = result.formatted_address
  yield put(getHistorySuccess(history))
}

function * mapSaga () {
  yield takeEvery('maps/getMapFetch', workGetMapsFetch)
}

export default mapSaga
