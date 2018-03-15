import { notification, logging } from 'services'

export default { handleServerError }

function handleServerError(err) {
  logging.error(err)
  notification.error({ message: 'Server error, Please check your internet or contact administrator !!!' })
}
