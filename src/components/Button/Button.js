import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = props => {
  const { children } = props
  return <button {...props}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  type: 'button',
}

export default Button
