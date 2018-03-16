import { location } from 'services'
import { toggleLoading } from 'actions/common'

export const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION'
export const GET_CURRENT_LOCATION_SUCCESS = 'GET_CURRENT_LOCATION_SUCCESS'

export { getCurrentLocation }

function getCurrentLocation() {
  return dispatch => {
    dispatch({ type: GET_CURRENT_LOCATION })
    location
      .getCurrentLocation()
      .then(getAddressFromLocation)
      .then(payload => {
        dispatch({ type: GET_CURRENT_LOCATION_SUCCESS, payload })
        dispatch(toggleLoading(false))
      })
  }
}

function getAddressFromLocation({ coords }) {
  const latlng = { lat: coords.latitude, lng: coords.longitude }
  return new Promise((resolve, reject) => {
    location
      .getAddress(latlng)
      .then(({ addressObj, formatedAddress }) => {
        resolve({ latlng, addressObj, formatedAddress })
      })
      .catch(reject)
  })
}
