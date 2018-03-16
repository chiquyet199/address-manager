import {
  ADD_ADDRESS_SUCCESS,
  EDIT_ADDRESS_SUCCESS,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES,
} from 'actions/address'
import { SERVER_ERROR } from 'actions/common'

const initialListedIds = []
const initialById = {}
const initialLoadingStatus = false
const loadingChecker = {
  ADD_ADDRESS_SUCCESS: false,
  EDIT_ADDRESS_SUCCESS: false,
  GET_ADDRESSES_SUCCESS: false,
  GET_ADDRESSES,
  SERVER_ERROR,
}

const byIdActionHandlers = {}
const listIdsActionHandlers = {}

byIdActionHandlers[GET_ADDRESSES_SUCCESS] = (state, addressObj) => {
  return addressObj
}
byIdActionHandlers[ADD_ADDRESS_SUCCESS] = (state, newAddress) => {
  return { ...state, [newAddress.id]: newAddress }
}
byIdActionHandlers[EDIT_ADDRESS_SUCCESS] = (state, editedAddress) => {
  return { ...state, [editedAddress.id]: editedAddress }
}

listIdsActionHandlers[GET_ADDRESSES_SUCCESS] = (state, addressObj) => {
  const addresses = []
  for (let key in addressObj) {
    addresses.push(key)
  }
  return addresses
}
listIdsActionHandlers[ADD_ADDRESS_SUCCESS] = (state, newAddress) => {
  const { id } = newAddress
  return [id, ...state]
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

function checkLoading(state = initialLoadingStatus, action) {
  if (loadingChecker.hasOwnProperty(action.type)) return loadingChecker[action.type] !== false
  return state
}

export default (state = {}, action) => {
  return {
    byId: byId(state.byId, action, state),
    listedIds: listedIds(state.listedIds, action, state),
    isLoading: checkLoading(state.isLoading, action),
  }
}
