import React from 'react'
import PropTypes from 'prop-types'

import './TextInput.scss'

const TextInput = props => {
  const { label, name } = props
  return (
    <div className="input-wrapper">
      <label>
        <span>{label}</span>
        <input {...props} type="text" htmlFor={name} autoComplete="off" />
      </label>
    </div>
  )
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextInput
