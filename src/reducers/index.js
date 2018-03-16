import { combineReducers } from 'redux'

import common from 'reducers/common'
import address from 'reducers/address'
import currentLocation from 'reducers/current-location'

export default combineReducers({ common, address, currentLocation })
