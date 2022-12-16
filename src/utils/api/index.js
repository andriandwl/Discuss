import loadScript from 'load-script'
import {
  GOOGLE_API,
  GOOGLE_URL
} from './constants'

const URL = `${GOOGLE_URL}?key=${GOOGLE_API}&libraries=places`

export const loadGoogleMapApi = (
  success = () => {},
  error = () => {}
) => {
  if (window.google) {
    success()
  } else {
    loadScript(URL, err => {
      const callback = err ? error : success
      callback()
    })
  }
}

export default {}
