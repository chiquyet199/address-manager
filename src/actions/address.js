import { guid } from 'services/utils'

export const ADD_ADDRESS = 'ADD_ADDRESS'
export const EDIT_ADDRESS = 'EDIT_ADDRESS'

export { addAddress, editAddress }

/**
 *
 * @param {Address object will be add to list} address
 */
function addAddress(address) {
  const id = guid()
  return {
    type: ADD_ADDRESS,
    payload: { id, ...address },
  }
}

/**
 *
 * @param {Address object will be get updated} editedAddress
 */
function editAddress(editedAddress) {
  return {
    type: EDIT_ADDRESS,
    payload: editedAddress,
  }
}
