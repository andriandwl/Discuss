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

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return dummy
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error(err)
    return dummy
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.error(err)
  }
}
