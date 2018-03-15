import React from 'react'
import PropTypes from 'prop-types'

import './TextInput.scss'

const TextInput = props => {
  const { label, value, onChange, name } = props
  return (
    <div className="input-wrapper">
      <label>
        {label}
        <input type="text" htmlFor={name} value={value} onChange={onChange} />
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
