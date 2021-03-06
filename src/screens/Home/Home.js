import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addresses } from 'services'
import { addAddress, editAddress, getAddresses } from 'actions/address'
import { Loading, AddressItem, AddressForm, Map, CsvDownloader } from 'components'

import './Home.scss'

class Home extends Component {
  state = {
    showMap: false,
  }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    currentAddressObj: PropTypes.object,
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

  map = null
  addressForm = null

  componentDidMount() {
    addresses.bindFirebaseEventListener({
      onChildAdded: this.props.addAddress,
      onChildChanged: this.props.editAddress,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentAddressObj !== this.props.currentAddressObj) {
      this.addressForm.fillData(nextProps.currentAddressObj)
    }
  }

  enableEditMode = id => {
    this.showMap()
    const { addressesById } = this.props
    const { street, ward, district, city, country } = addressesById[id]
    const locationData = { lat: addressesById[id].lat, lng: addressesById[id].lng }
    const address = [street, ward, district, city, country].join(', '.replace(/, ,/g, ','))
    this.addressForm.changeMode('edit')
    this.addressForm.fillData(addressesById[id])
    this.map.getWrappedInstance().createMarker(locationData, address)
    this.map.getWrappedInstance().moveTo(locationData)
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

  mapClickHandler = address => {
    this.addressForm.fillData(address, true)
  }

  addressFormSubmit = ({ id, street, ward, district, city, country, lat, lng }, formMode) => {
    if (formMode === 'edit' && !!id) {
      addresses.editAddress({ id, street, ward, district, city, country, lat, lng })
    } else if (formMode === 'add') {
      addresses.addAddress({ street, ward, district, city, country, lat, lng })
    }
    this.addressForm.reset()
    this.hideMap()
  }

  addressFormFocus = () => {
    if (!this.state.showMap) {
      this.showMap()
    }
  }

  hideMap = () => {
    this.setState({ showMap: false })
    this.map.getWrappedInstance().clearMarker()
  }

  showMap = () => {
    this.setState({ showMap: true })
  }

  render() {
    const csvHeaders = ['Street', 'Ward', 'District', 'City', 'Country']
    const { formMode, showMap } = this.state
    const { isFetching, addressesListedIds, addressesById } = this.props
    const data = addressesListedIds.map(item => {
      const { street, ward, district, city, country } = addressesById[item]
      return [street, ward, district, city, country]
    })
    const mapClasses = showMap ? 'map-container show' : 'map-container'
    return (
      <main className="home-wrapper">
        <div className="form-container">
          <AddressForm
            ref={node => (this.addressForm = node)}
            mode={formMode}
            onFocus={this.addressFormFocus}
            onCancel={this.hideMap}
            onSubmit={this.addressFormSubmit}
          />
        </div>
        {isFetching ? (
          <Loading />
        ) : (
          <div className="address-container">{addressesListedIds.map(this.renderAddressItem)}</div>
        )}
        <div className="download-btn">
          <CsvDownloader headers={csvHeaders} data={data} text={'Download'} />
        </div>
        <div className={mapClasses}>
          <Map ref={node => (this.map = node)} onClick={this.mapClickHandler} />
        </div>
      </main>
    )
  }
}

const mapStateToProps = ({ address, currentLocation }) => {
  return {
    addressesById: address.byId,
    addressesListedIds: address.listedIds,
    isFetching: address.isLoading,
    currentAddressObj: currentLocation.addressObj,
  }
}

export default connect(mapStateToProps, { addAddress, editAddress, getAddresses })(Home)
