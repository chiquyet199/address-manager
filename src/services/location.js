import { notification } from 'services'

export default { getCurrentLocation, getAddress }

const GeoCoder = google ? new google.maps.Geocoder() : null

/**
 * Function that take lat and lng and call the callback with formated address
 * @param {location object {lat: Number, lng: Number}} latlng
 * @param {callback function with formated address as parameter} callback
 */
function getAddress(latlng, callback) {
  if (!GeoCoder) notification.warn({ message: 'Please make sure your internet connection still available' })
  GeoCoder.geocode({ location: latlng }, (results, status) => {
    const unknownAddress = 'unkown address'
    if (status === 'OK') {
      if (results[0]) {
        callback(results[0].formatted_address)
      } else {
        callback(unknownAddress)
        notification.warn({ message: 'No results found' })
      }
    } else {
      callback(unknownAddress)
      notification.warn({ message: `Geocoder failed due to: ${status}` })
    }
  })
}

/**
 * Function call to get current location. Return null if browser not support
 */
function getCurrentLocation() {
  if (!window.navigator.geolocation) {
    notification.warn({ message: 'Geolocation is not supported by this browser' })
    return null
  } else {
    return window.navigator.geolocation.getCurrentPosition()
  }
}
