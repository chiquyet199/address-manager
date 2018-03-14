import { combineReducers } from 'redux'

import common from 'reducers/common'
import address from 'reducers/address'

export default combineReducers({ common, address })
