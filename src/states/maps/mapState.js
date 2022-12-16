import { createSlice } from '@reduxjs/toolkit'

export const mapSlice = createSlice({
  name: 'maps',
  initialState: {
    mapCenter: {
      lat: -1.2884,
      lng: 36.8233
    },
    autocompleteValue: '',
    zoom: 10,
    customMarkersArray: [],
    histories: []
  },
  reducers: {}
})
