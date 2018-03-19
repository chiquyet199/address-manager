import { database } from 'configs/firebase'

export default { addAddress, editAddress }

const ref = database.ref('/addresses')

/**
 * function call to integrate with database to add address
 * @param {address object} address
 */
function addAddress(address) {
  const { lat, lng, street, ward, district, city, country } = address
  if (!lat || !lng) {
    address = { street, ward, district, city, country }
  }
  ref.push(address)
}

/**
 * function call to integrate with database to edit address
 * @param {address object} address
 */
function editAddress(editedAddress) {
  ref.child(editedAddress.id).set(editedAddress)
}
