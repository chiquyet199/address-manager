import { database } from 'configs/firebase'

export default { addAddress, editAddress, bindFirebaseEventListener, getAllAddresses }

const ref = database.ref('/addresses')

/**
 * Function use to bind an even handler for CRUD operator on address collection
 * @param {contain some event handlers for add, edit, delete} options
 */
function bindFirebaseEventListener(options) {
  const { onChildAdded, onChildChanged } = options

  ref.on('child_added', snap => {
    const dataAdded = snap.val()
    onChildAdded({ ...dataAdded, id: snap.key })
  })
  ref.on('child_changed', snap => {
    const dataChanged = snap.val()
    onChildChanged({ ...dataChanged, id: snap.key })
  })
}

/**
 * Function to get all address records from collection address
 */
function getAllAddresses() {
  return new Promise((resolve, reject) => {
    try {
      database
        .ref('/addresses')
        .once('value')
        .then(res => {
          resolve(res.exportVal())
        })
    } catch (err) {
      reject(err)
    }
  })
}

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
