import React from 'react'
import PropTypes from 'prop-types'

import './Loading.scss'

const Loading = props => {
  const { blockUi } = props
  return (
    <div className={blockUi ? 'absolute-loading' : ''}>
      {blockUi && <div className="overlay" />}
      <div className="loading-container">
        <div className="loading" />
        <div id="loading-text">loading</div>
      </div>
    </div>
  )
}

Loading.propTypes = {
  blockUi: PropTypes.bool,
}

export default Loading
