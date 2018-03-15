export default { warn, error }

/**
 *
 * @param {notification error object {message: string}} param0
 */
function warn({ message }) {
  alert(message)
}

/**
 *
 * @param {notification error object {message: string}} param0
 */
function error({ message }) {
  alert(message)
}
