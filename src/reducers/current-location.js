import { GET_CURRENT_LOCATION, GET_CURRENT_LOCATION_SUCCESS } from 'actions/current-location'

const initialState = {
  gettingCurrentLocation: false,
  latlng: null,
  addressObj: {},
  formatedAddress: '',
}

const actionHandlers = {}

actionHandlers[GET_CURRENT_LOCATION] = state => {
  return { ...state, gettingCurrentLocation: true }
}

actionHandlers[GET_CURRENT_LOCATION_SUCCESS] = (state, { latlng, addressObj, formatedAddress }) => {
  return { ...state, latlng, addressObj, formatedAddress, gettingCurrentLocation: false }
}

export default (state = initialState, action) => {
  var handler = actionHandlers[action.type]
  if (handler) return handler(state, action.payload)
  return state
}
