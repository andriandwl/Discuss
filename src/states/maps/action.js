const ActionType = {
  SET_MAP_CENTER: 'SET_MAP_CENTER',
  SET_AUTOCOMPLETE_VALUE: 'SET_AUTOCOMPLETE_VALUE',
  SET_ZOOM: 'SET_ZOOM',
  ADD_HISTORY: 'ADD_HISTORY'
}

function setMapCenter (mapCenter) {
  return {
    type: ActionType.SET_MAP_CENTER,
    mapCenter
  }
}

function setAutocompleteValue (autocompleteValue) {
  return {
    type: ActionType.SET_AUTOCOMPLETE_VALUE,
    autocompleteValue

  }
}

function setZoom (zoom) {
  return {
    type: ActionType.SET_ZOOM,
    zoom
  }
}

function addHistory (history) {
  return {
    type: ActionType.ADD_HISTORY,
    history
  }
}

function asyncSetMapCenter (mapCenter) {
  return async (dispatch) => {
    try {
      dispatch(setMapCenter(mapCenter))
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncSetAutocompleteValue (autocompleteValue) {
  return async (dispatch) => {
    try {
      dispatch(setMapCenter(autocompleteValue))
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncSetZoom (zoom) {
  return async (dispatch) => {
    try {
      dispatch(setZoom(zoom))
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType, setMapCenter, setAutocompleteValue, addHistory,
  setZoom, asyncSetAutocompleteValue, asyncSetZoom, asyncSetMapCenter
}
