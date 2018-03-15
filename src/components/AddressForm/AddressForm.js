import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { utils } from 'services'
import { error } from 'services/notification'

class AddressForm extends Component {
  state = {
    id: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    country: '',
  }

  static propTypes = {
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    onSubmit: () => {},
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.shallowCompare(this, nextProps, nextState)
  }

  shallowCompare = (instance, nextProps, nextState) => {
    return (
      !utils.shallowEqual(instance.props, nextProps, true) || !utils.shallowEqual(instance.state, nextState)
    )
  }

  changeMode = mode => {
    this.setState({ mode })
  }

  fillData = data => {
    const { id, street, ward, district, city, country } = data
    this.setState({
      id,
      street: street || '',
      ward: ward || '',
      district: district || '',
      city: city || '',
      country: country || '',
    })
  }

  reset = () => {
    this.setState({ street: '', ward: '', district: '', city: '', country: '' })
  }

  validate = () => {
    const { street, ward, district, city } = this.state
    const haveStreet = !!street
    const haveCity = !!city
    const haveWard = !!ward
    const haveDistrict = !!district
    return (haveStreet && haveCity) || (haveStreet && haveWard && haveDistrict)
  }

  onSubmit = event => {
    event.preventDefault()
    const { mode, street, ward, district, city, country, id } = this.state
    if (this.validate()) {
      this.reset()
      this.props.onSubmit({ id, street, ward, district, city, country }, mode)
    } else {
      error({ message: '"street" and "city" OR "street" and "ward" and "district" should not be empty' })
    }
  }

  handleChange = event => {
    const targetState = event.target.getAttribute('for')
    this.setState({ [targetState]: event.target.value })
  }

  render() {
    const { mode, street, ward, district, city, country } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Street:
          <input type="text" htmlFor="street" value={street} onChange={this.handleChange} />
        </label>
        <label>
          Ward:
          <input type="text" htmlFor="ward" value={ward} onChange={this.handleChange} />
        </label>
        <label>
          District:
          <input type="text" htmlFor="district" value={district} onChange={this.handleChange} />
        </label>
        <label>
          City:
          <input type="text" htmlFor="city" value={city} onChange={this.handleChange} />
        </label>
        <label>
          Country:
          <input type="text" htmlFor="country" value={country} onChange={this.handleChange} />
        </label>
        <input type="submit" value={mode === 'add' ? 'Add' : 'Save'} />
      </form>
    )
  }
}

export default AddressForm
