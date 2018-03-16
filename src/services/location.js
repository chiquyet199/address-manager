import { notification } from 'services'

export default { getCurrentLocation, getAddress }

const GeoCoder = google ? new google.maps.Geocoder() : null
getCurrentLocation(() => {})

/**
 * Function that take lat and lng and call the callback with address object and formated one
 * @param {location object {lat: Number, lng: Number}} latlng
 * @param {callback function with address object as parameter and formated one} callback
 */
function getAddress(latlng) {
  return new Promise((resolve, reject) => {
    if (!GeoCoder) {
      notification.warn({ message: 'Please make sure your internet connection still available' })
      reject({ message: 'Please make sure your internet connection still available' })
    }
    GeoCoder.geocode({ location: latlng }, (results, status) => {
      const unknownAddressObj = { addressObj: {}, formatedAddress: 'Unkown address' }
      if (status === 'OK') {
        if (results[0]) {
          const data = results[0].formatted_address.split(',')
          const length = data.length
          resolve({
            addressObj: {
              street: data[0],
              ward: length > 4 ? data[length - 4] : '',
              district: data[length - 3],
              city: data[length - 2],
              country: data[length - 1],
            },
            formatedAddress: results[0].formatted_address,
          })
        } else {
          resolve(unknownAddressObj)
          notification.warn({ message: 'No results found' })
        }
      } else {
        resolve(unknownAddressObj)
        notification.warn({ message: `Geocoder failed due to: ${status}` })
      }
    })
  })
}

/**
 * Function call to get current location. Return null if browser not support
 */
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!window.navigator.geolocation) {
      notification.warn({ message: 'Geolocation is not supported by this browser' })
      reject({ message: 'Geolocation is not supported by this browser' })
    } else {
      try {
        window.navigator.geolocation.getCurrentPosition(resolve)
      } catch (err) {
        reject(err)
      }
    }
  })
}
