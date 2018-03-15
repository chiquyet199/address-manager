import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { utils } from 'services'

import './AddressItem.scss'

class AddressItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.shallowCompare(this, nextProps, nextState)
  }

  shallowCompare = (instance, nextProps, nextState) => {
    return (
      !utils.shallowEqual(instance.props, nextProps, true) || !utils.shallowEqual(instance.state, nextState)
    )
  }

  render() {
    const { street, ward, district, city, country, onClick } = this.props
    const display = `${street}, ${ward}, ${district}, ${city}, ${country}`
    return (
      <div className="item-wrapper" onClick={onClick}>
        <p>{display.replace(/, ,/g, ',')}</p>
      </div>
    )
  }
}

AddressItem.propTypes = {
  street: PropTypes.string.isRequired,
  ward: PropTypes.string,
  district: PropTypes.string,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

AddressItem.defaultProps = {
  onClick: () => {},
}

export default AddressItem
