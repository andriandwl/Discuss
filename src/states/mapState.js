import { createSlice } from '@reduxjs/toolkit'

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    mapCenter: {
      lat: -1.2884,
      lng: 36.8233
    },
    autocompleteValue: '',
    zoom: 10,
    customMarkersArray: [],
    history: [],
    isLoading: false
  },
  reducers: {
    getMapFetch: (state) => {
      state.isLoading = true
    },
    getMapCenterSuccess: (state, action) => {
      state.mapCenter = action.payload
      state.isLoading = false
    },
    getMapCenterFailure: (state) => {
      state.isLoading = false
    },
    getAutoCompleteValueSuccess: (state, action) => {
      state.autoComplete = action.payload
      state.isLoading = false
    },
    getAutoCompleteValueFailure: (state) => {
      state.isLoading = false
    },
    getZoomSuccess: (state, action) => {
      state.zoom = action.payload
      state.isLoading = false
    },
    getZoomFailure: (state) => {
      state.isLoading = false
    },
    getHistorySuccess: (state, action) => {
      state.history = [...state.history, action.payload]
    },
    getHistoryFailure: (state) => {
      state.isLoading = false
    }
  }
})

export const {
  getMapFetch,
  getAutoCompleteValueFailure, getAutoCompleteValueSuccess,
  getMapCenterFailure, getMapCenterSuccess, getZoomFailure,
  getZoomSuccess, getHistorySuccess, getHistoryFailure
} = mapSlice.actions

export default mapSlice.reducer
