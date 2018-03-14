import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addAddress, editAddress } from 'actions/address'
import { Loading, AddressItem, AddressForm } from 'components'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingAddress: {},
    }
  }
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    addressesById: PropTypes.object.isRequired,
    addressesListedIds: PropTypes.array.isRequired,
    addAddress: PropTypes.func.isRequired,
    editAddress: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isFetching: false,
    addresses: [],
  }

  enableEditMode = id => {
    const { addressesById } = this.props
    this.setState({ editingAddress: addressesById[id], formMode: 'edit' })
  }

  enalbleAddMode = () => {
    this.setState({ formMode: 'add' })
  }

  renderAddressItem = id => {
    return (
      <AddressItem
        key={id}
        {...this.props.addressesById[id]}
        onClick={() => {
          this.enableEditMode(id)
        }}
      />
    )
  }

  addressFormSubmit = data => {
    const { formMode } = this.state
    formMode === 'edit'
      ? this.props.editAddress({ ...data, id: this.state.editingAddress.id })
      : this.props.addAddress(data)
    this.enalbleAddMode()
  }

  render() {
    const { isFetching, addressesListedIds } = this.props
    const { editingAddress, formMode } = this.state
    return (
      <div>
        {isFetching && <Loading />}
        <AddressForm mode={formMode} data={editingAddress} onSubmit={this.addressFormSubmit} />
        {addressesListedIds.map(this.renderAddressItem)}
      </div>
    )
  }
}

const mapStateToProps = ({ address }) => {
  return {
    addressesById: address.byId,
    addressesListedIds: address.listedIds,
    isFetching: address.isFetching,
  }
}

export default connect(mapStateToProps, { addAddress, editAddress })(Home)
