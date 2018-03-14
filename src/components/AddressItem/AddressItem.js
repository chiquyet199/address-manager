import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddressItem extends Component {
  shouldComponentUpdate(nextProps) {
    const { street, ward, district, city, country } = this.props
    return (
      ward !== nextProps.ward ||
      city !== nextProps.city ||
      street !== nextProps.street ||
      country !== nextProps.country ||
      district !== nextProps.district
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
