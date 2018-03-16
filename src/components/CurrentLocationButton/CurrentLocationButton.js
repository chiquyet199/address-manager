import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentLocation } from 'actions/current-location'

import './CurrentLocationButton.scss'

class CurrentLocationButton extends Component {
  render() {
    return <div className="current-location-btn" onClick={this.props.getCurrentLocation} />
  }
}

CurrentLocationButton.propTypes = {
  getCurrentLocation: PropTypes.func,
}

export default connect(null, { getCurrentLocation })(CurrentLocationButton)
