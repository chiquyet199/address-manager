export const ADD_ADDRESS = 'ADD_ADDRESS'
export const EDIT_ADDRESS = 'EDIT_ADDRESS'

export { addAddress, editAddress }

function addAddress() {
  const id = new Date().getTime() + ''
  return {
    type: ADD_ADDRESS,
    payload: {
      id,
      street: 'Le Thanh Ton',
      ward: 'Tan Dinh',
      district: id,
      city: 'Ho Chi Minh',
      country: 'Viet Nam',
    },
  }
}

function editAddress(editedAddress) {
  return {
    type: EDIT_ADDRESS,
    payload: editedAddress,
  }
}
