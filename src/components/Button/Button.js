import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = props => {
  const { children, type, onClick } = props
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  )
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
