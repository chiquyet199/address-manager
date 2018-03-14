import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addAddress, editAddress } from 'actions/address.action'
import { Loading, AddressItem } from 'components'

class Home extends Component {
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

  editAddress = id => {
    const { editAddress, addressesById } = this.props
    editAddress({ ...addressesById[id], country: 'XXX' })
  }

  renderAddressItem = id => {
    return (
      <AddressItem
        key={id}
        {...this.props.addressesById[id]}
        onClick={() => {
          this.editAddress(id)
        }}
      />
    )
  }

  render() {
    const { isFetching, addressesListedIds, addAddress } = this.props
    return (
      <div>
        {isFetching && <Loading />}
        <button onClick={addAddress}>Add</button>
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
