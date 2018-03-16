import { database } from 'configs/firebase'
import { toggleLoading, serverError } from 'actions/common'

export const ADD_ADDRESS = 'ADD_ADDRESS'
export const EDIT_ADDRESS = 'EDIT_ADDRESS'
export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS'

export { addAddress, editAddress, getAddresses }

/**
 * Fetch all address data from firebase
 */
function getAddresses() {
  return dispatch => {
    dispatch(toggleLoading(true))
    database
      .ref('/addresses')
      .once('value')
      .then(res => {
        dispatch(toggleLoading(false))
        const data = res.exportVal()
        const payload = {}
        for (let key in data) {
          payload[key] = data[key]
          payload[key].id = key
        }
        dispatch({ type: GET_ADDRESSES_SUCCESS, payload })
      })
      .catch(err => {
        dispatch(toggleLoading(false))
        dispatch(serverError(err))
      })
  }
}

/**
 *
 * @param {Address object will be add to list} address
 */
function addAddress(address) {
  // return { type: ADD_ADDRESS, payload: address }
  return dispatch => {
    // dispatch(toggleLoading(true))
    const ref = database.ref('/addresses')
    ref
      .push(address)
      .then(res => {
        // dispatch(toggleLoading(false))
        dispatch({ type: ADD_ADDRESS, payload: { ...address, id: res.key } })
      })
      .catch(err => {
        // dispatch(toggleLoading(false))
        dispatch(serverError(err))
      })
  }
}

/**
 *
 * @param {Address object will be get updated} editedAddress
 */
function editAddress(editedAddress) {
  return dispatch => {
    const ref = database.ref('/addresses')
    ref.child(editedAddress.id).set(editedAddress)
    dispatch({ type: EDIT_ADDRESS, payload: editedAddress })
  }
}
