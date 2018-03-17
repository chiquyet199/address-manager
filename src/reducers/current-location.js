import { GET_CURRENT_LOCATION, GET_CURRENT_LOCATION_SUCCESS } from 'actions/current-location'

const initialState = {
  gettingCurrentLocation: false,
  latlng: {},
  addressObj: {},
  formatedAddress: '',
}

const actionHandlers = {}

actionHandlers[GET_CURRENT_LOCATION] = state => {
  return { ...state, gettingCurrentLocation: true }
}

actionHandlers[GET_CURRENT_LOCATION_SUCCESS] = (state, { latlng, addressObj, formatedAddress }) => {
  const { lat, lng } = latlng
  return {
    ...state,
    latlng,
    formatedAddress,
    gettingCurrentLocation: false,
    addressObj: { ...addressObj, lat, lng },
  }
}

export default (state = initialState, action) => {
  var handler = actionHandlers[action.type]
  if (handler) return handler(state, action.payload)
  return state
}
