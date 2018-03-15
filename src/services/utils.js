export default { shallowEqual, guid }

/**
 *
 * @param {first object} objA
 * @param {second object} objB
 * @param {bool to determine if should it ignore function property or not} ignoreFunction
 */
function shallowEqual(objA, objB, ignoreFunction) {
  if (objA === objB) {
    return true
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  var keysA = Object.keys(objA)
  var keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  var bHasOwnProperty = hasOwnProperty.bind(objB)
  for (var i = 0; i < keysA.length; i++) {
    if (ignoreFunction && typeof objA[keysA[i]] === 'function') continue
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }

  return true
}

/**
 * Function to generate random GUID
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
