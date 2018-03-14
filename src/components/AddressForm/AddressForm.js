import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddressForm extends Component {
  constructor(props) {
    super(props)
    const { mode } = this.props
    const { street, ward, district, city, country } = this.props.data
    const inEditMode = mode === 'edit'
    this.state = {
      street: inEditMode ? street : '',
      ward: inEditMode ? ward : '',
      district: inEditMode ? district : '',
      city: inEditMode ? city : '',
      country: inEditMode ? country : '',
    }
  }

  static propTypes = {
    mode: PropTypes.oneOf(['add', 'edit']),
    data: PropTypes.object,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    mode: 'add',
    data: {},
  }

  componentWillReceiveProps(nextProps) {
    const { mode } = nextProps
    const { street, ward, district, city, country } = nextProps.data
    const inEditMode = mode === 'edit'
    this.setState({
      street: inEditMode ? street : '',
      ward: inEditMode ? ward : '',
      district: inEditMode ? district : '',
      city: inEditMode ? city : '',
      country: inEditMode ? country : '',
    })
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
    const { street, ward, district, city, country } = this.state
    if (this.validate()) {
      this.clearForm()
      this.props.onSubmit({ street, ward, district, city, country })
    } else {
      alert(
        'Pls check form data again. "street" and "city" OR "street" and "ward" and "district" should not be empty',
      )
    }
  }

  clearForm = () => {
    this.setState({ street: '', ward: '', district: '', city: '', country: '' })
  }

  handleChange = event => {
    const targetState = event.target.getAttribute('for')
    this.setState({ [targetState]: event.target.value })
  }

  render() {
    const { mode } = this.props
    const { street, ward, district, city, country } = this.state
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
