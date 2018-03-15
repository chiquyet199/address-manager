export default { info, warn, error }

/**
 *
 * @param {any type} err
 */
function error(err) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Error: ${err}`) // eslint-disable-line
  }
}

/**
 *
 * @param {any type} info
 */
function info(info) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(`Info: ${info}`) // eslint-disable-line
  }
}

/**
 *
 * @param {any type} messafe
 */
function warn(messafe) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`Warn: ${messafe}`) // eslint-disable-line
  }
}
