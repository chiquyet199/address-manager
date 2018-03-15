import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils } from 'services'

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
    return (
      <div onClick={onClick}>
        <ul>
          <li>{street}</li>
          <li>{ward}</li>
          <li>{district}</li>
          <li>{city}</li>
          <li>{country}</li>
        </ul>
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
