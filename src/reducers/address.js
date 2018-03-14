import { ADD_ADDRESS, EDIT_ADDRESS, GET_ADDRESSES_SUCCESS } from 'actions/address'

const initialListedIds = []
const initialById = {}

const byIdActionHandlers = {}
const listIdsActionHandlers = {}

byIdActionHandlers[GET_ADDRESSES_SUCCESS] = (state, addressObj) => {
  return addressObj
}
byIdActionHandlers[ADD_ADDRESS] = (state, newAddress) => {
  return { ...state, [newAddress.id]: newAddress }
}
byIdActionHandlers[EDIT_ADDRESS] = (state, editedAddress) => {
  return { ...state, [editedAddress.id]: editedAddress }
}

listIdsActionHandlers[GET_ADDRESSES_SUCCESS] = (state, addressObj) => {
  const addresses = []
  for (let key in addressObj) {
    addresses.push(key)
  }
  return addresses
}
listIdsActionHandlers[ADD_ADDRESS] = (state, newAddress) => {
  const { id } = newAddress
  return [...state, id]
}

function byId(state = initialById, action) {
  const handler = byIdActionHandlers[action.type]
  if (handler) return handler(state, action.payload)
  return state
}

function listedIds(state = initialListedIds, action) {
  const handler = listIdsActionHandlers[action.type]
  if (handler) return handler(state, action.payload)
  return state
}

export default (state = {}, action) => {
  return {
    byId: byId(state.byId, action, state),
    listedIds: listedIds(state.listedIds, action, state),
  }
}
