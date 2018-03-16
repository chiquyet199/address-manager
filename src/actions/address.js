import { database } from 'configs/firebase'
import { serverError } from 'actions/common'

export const GET_ADDRESSES = 'GET_ADDRESSES'
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS'
export const EDIT_ADDRESS_SUCCESS = 'EDIT_ADDRESS_SUCCESS'
export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS'

export { addAddress, editAddress, getAddresses }

/**
 * Fetch all address data from firebase
 */
function getAddresses() {
  return dispatch => {
    dispatch({ type: GET_ADDRESSES })
    database
      .ref('/addresses')
      .once('value')
      .then(res => {
        const data = res.exportVal()
        const payload = {}
        for (let key in data) {
          payload[key] = data[key]
          payload[key].id = key
        }
        dispatch({ type: GET_ADDRESSES_SUCCESS, payload })
      })
      .catch(err => {
        dispatch(serverError(err))
      })
  }
}

/**
 *
 * @param {Address object will be add to list} address
 */
function addAddress(address) {
  return dispatch => {
    const ref = database.ref('/addresses')
    ref
      .push(address)
      .then(res => {
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: { ...address, id: res.key } })
      })
      .catch(err => {
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
    dispatch({ type: EDIT_ADDRESS_SUCCESS, payload: editedAddress })
  }
}
