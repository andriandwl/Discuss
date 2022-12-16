import { Box, Divider, Grid, InputBase, Paper, Typography } from '@mui/material'
import { Autocomplete, GoogleMap, LoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'
import { apiKey, loadScriptPlaces, mapContainerStyle } from './constants'
import { getAutoCompleteValueSuccess, getHistorySuccess, getMapCenterSuccess, getZoomSuccess } from '../states/mapState'

function Maps () {
  const dispatch = useDispatch()

  const [map, setMap] = useState(null)
  const [autocomplete, setAutocomplete] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const mapCenter = useSelector(state => state.maps.mapCenter)
  const autocompleteValue = useSelector(state => state.maps.autocomplete)
  const zoom = useSelector(state => state.maps.zoom)
  const history = useSelector(state => state.maps.history)

  const onAutoCompleteLoad = autocomplete => {
    setAutocomplete(autocomplete)
  }

  const onMapLoaded = map => {
    setMap(map)
  }

  const onAutocompletePlaceChanged = () => {
    if (autocomplete !== null) {
      const autocompletePlace = autocomplete.getPlace()
      console.log(autocompletePlace)
      if (autocompletePlace.geometry) {
        const currentCoordinates = {
          lat: autocompletePlace.geometry.location.lat(),
          lng: autocompletePlace.geometry.location.lng()
        }
        dispatch(getMapCenterSuccess(currentCoordinates))
        dispatch(getAutoCompleteValueSuccess(autocompletePlace.formatted_address))
        // dispatch(addHistory(autocompletePlace.formatted_address))
        setInputValue(autocompletePlace.formatted_address)
        dispatch(getHistorySuccess(autocompletePlace.formatted_address))
        console.log(history)
      } else {
        console.log('No location selected')
      }
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }
  const onMapZoomChanged = () => {
    if (map) {
      dispatch(getZoomSuccess(map.getZoom()))
    }
  }

  const onMapDragEnd = () => {
    if (map) {
      const center = { lat: map.getCenter().lat(), lng: map.getCenter().lng() }
      dispatch(getMapCenterSuccess(center))
    }
  }

  const onInputChange = (event) => {
    dispatch(getAutoCompleteValueSuccess(''))
    setInputValue(event.target.value)
  }

  return (
    <Grid container component="main">
      <LoadScript
        googleMapsApiKey={ apiKey }
        libraries={ loadScriptPlaces }
      >
      <Grid
        item
        xs={ 10 }
        sm={ 10 }
        md={ 7 }
        >
        <GoogleMap
          id="maps-assignment"
          mapContainerStyle={ mapContainerStyle }
          center={ mapCenter }
          zoom={ zoom }
          onLoad={ onMapLoaded }
          onZoomChanged={ onMapZoomChanged }
          onDragEnd={ onMapDragEnd }
        >
        </GoogleMap>
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        md={5}
        component={Paper}
        elevation={6}
        square
        align="center"
        >
          <Typography variant="h6" gutterBottom sx={{
            mt: 3
          }}>
            Assignment
          </Typography>
          <Typography variant="h4">
            Google Place Autocomplete
          </Typography>
        <Box sx={{
          my: 4
        }}>
            <Autocomplete
              onLoad={ onAutoCompleteLoad }
              onPlaceChanged={ onAutocompletePlaceChanged }
            >
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={ autocompleteValue || inputValue }
                onChange={ onInputChange }
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
              </IconButton>
            </Paper>
            </Autocomplete>
        </Box>
        <Typography variant="h6" gutterBottom sx={{
          mt: 15
        }}>
          History Search
        </Typography>
        <Box>

        </Box>
      </Grid>
      </LoadScript>
    </Grid>
  )
}

export default Maps
