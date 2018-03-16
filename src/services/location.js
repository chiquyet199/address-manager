import { notification } from 'services'

export default { getCurrentLocation, getAddress }

const GeoCoder = google ? new google.maps.Geocoder() : null
getCurrentLocation(() => {})
/**
 * Function that take lat and lng and call the callback with address object and formated one
 * @param {location object {lat: Number, lng: Number}} latlng
 * @param {callback function with address object as parameter and formated one} callback
 */
function getAddress(latlng, callback) {
  if (!GeoCoder) notification.warn({ message: 'Please make sure your internet connection still available' })
  GeoCoder.geocode({ location: latlng }, (results, status) => {
    const unknownAddress = 'unkown address'
    if (status === 'OK') {
      if (results[0]) {
        const data = results[0].formatted_address.split(',')
        const length = data.length
        callback(
          {
            street: data[0],
            ward: length > 4 ? data[length - 4] : '',
            district: data[length - 3],
            city: data[length - 2],
            country: data[length - 1],
          },
          results[0].formatted_address,
        )
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
function getCurrentLocation(callback) {
  if (!window.navigator.geolocation) {
    notification.warn({ message: 'Geolocation is not supported by this browser' })
    return null
  } else {
    return window.navigator.geolocation.getCurrentPosition(callback)
  }
}
