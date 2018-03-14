import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { database } from 'configs/firebase'

import { addAddress, editAddress, getAddresses } from 'actions/address'
import { Loading, AddressItem, AddressForm, Map } from 'components'

class Home extends Component {
  state = {
    editingAddress: {},
  }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    addressesById: PropTypes.object.isRequired,
    addressesListedIds: PropTypes.array.isRequired,
    addAddress: PropTypes.func.isRequired,
    editAddress: PropTypes.func.isRequired,
    getAddresses: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isFetching: false,
    addresses: [],
  }

  addressForm = null
  addressRef = database.ref().child('addresses')

  componentWillMount() {
    // this.addressRef.on('child_added', snap => {
    //   console.log('child add', snap.val())
    //   // const dataAdded = snap.val()
    //   // this.props.addAddress({ ...dataAdded, id: snap.key })
    // })
    // this.addressRef.on('child_changed', snap => {
    //   // const dataChanged = snap.val()
    //   // this.props.editAddress({ ...dataChanged, id: snap.key })
    // })
    // this.addressRef.on('child_removed', snap => {
    //   console.log(snap.val())
    // })
  }

  componentDidMount() {
    this.props.getAddresses()
  }

  enableEditMode = id => {
    const { addressesById } = this.props
    this.addressForm.changeMode('edit')
    this.addressForm.fillData(addressesById[id])
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

  addressFormSubmit = (data, formMode) => {
    formMode === 'edit' ? this.props.editAddress(data) : this.props.addAddress(data)
  }

  render() {
    const { isFetching, addressesListedIds } = this.props
    const { editingAddress, formMode } = this.state
    return (
      <div>
        {isFetching && <Loading />}
        <Map />
        <AddressForm
          ref={node => (this.addressForm = node)}
          mode={formMode}
          data={editingAddress}
          onSubmit={this.addressFormSubmit}
        />
        {addressesListedIds.map(this.renderAddressItem)}
      </div>
    )
  }
}

const mapStateToProps = ({ address, common }) => {
  return {
    addressesById: address.byId,
    addressesListedIds: address.listedIds,
    isFetching: common.isLoading,
  }
}

export default connect(mapStateToProps, { addAddress, editAddress, getAddresses })(Home)
