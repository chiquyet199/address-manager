import { handleServerError } from 'services/common'

export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const SERVER_ERROR = 'SERVER_ERROR'

export { toggleLoading, serverError }

/**
 *
 * Use for toggle loading on api request
 * @param {true for turn loading on and viceverse} boolVal
 */
function toggleLoading(boolVal) {
  return {
    type: TOGGLE_LOADING,
    payload: boolVal,
  }
}

/**
 * Use to handle common server error in catch block
 * Raise an action and can be use for logging error later
 * @param {Error object from server} err
 */
function serverError(err) {
  handleServerError(err)
  return {
    type: SERVER_ERROR,
    payload: err,
  }
}
