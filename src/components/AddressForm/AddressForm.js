import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Button } from 'components'
import { utils, notification } from 'services'

import './AddressForm.scss'

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
    this.setState({ street: '', ward: '', district: '', city: '', country: '', mode: 'add' })
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
      notification.error({
        message: '"street" and "city" OR "street" and "ward" and "district" should not be empty',
      })
    }
  }

  handleChange = event => {
    const targetState = event.target.getAttribute('for')
    this.setState({ [targetState]: event.target.value })
  }

  render() {
    const { mode, street, ward, district, city, country } = this.state
    const inEditMode = mode === 'edit'
    return (
      <form className="form-wrapper" onSubmit={this.onSubmit}>
        <TextInput label="Street" name="street" value={street} onChange={this.handleChange} />
        <TextInput label="Ward" name="ward" value={ward} onChange={this.handleChange} />
        <TextInput label="District" name="district" value={district} onChange={this.handleChange} />
        <TextInput label="City" name="city" value={city} onChange={this.handleChange} />
        <TextInput label="Country" name="country" value={country} onChange={this.handleChange} />
        <div className="btn-group">
          <Button type="submit">{inEditMode ? 'Save' : 'Add'} </Button>
          {inEditMode && <Button onClick={this.reset}>Reset</Button>}
        </div>
      </form>
    )
  }
}

export default AddressForm
