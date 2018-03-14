import { ADD_ADDRESS, EDIT_ADDRESS } from 'actions/address'

const initialListedIds = ['20398162837', '20123162837']
const initialById = {
  '20398162837': {
    id: '20398162837',
    street: 'Le Thanh Ton',
    ward: 'Tan Dinh',
    district: '1',
    city: 'Ho Chi Minh',
    country: 'Viet Nam',
  },
  '20123162837': {
    id: '20123162837',
    street: 'Nguyen Tat Thanh',
    ward: 'Tan Thanh',
    district: '',
    city: 'Buon Ma Thuot',
    country: 'Viet Nam',
  },
}

const byIdActionHandlers = {}
const listIdsActionHandlers = {}

byIdActionHandlers[ADD_ADDRESS] = (state, newAddress) => {
  return { ...state, [newAddress.id]: newAddress }
}
byIdActionHandlers[EDIT_ADDRESS] = (state, editedAddress) => {
  return { ...state, [editedAddress.id]: editedAddress }
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
