import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { database } from 'configs/firebase'

import { location } from 'services'
import { addAddress, editAddress, getAddresses } from 'actions/address'
import { Loading, AddressItem, AddressForm, Map, CsvDownloader } from 'components'

import './Home.scss'

class Home extends Component {
  state = {
    editingAddress: {},
    showMap: false,
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

  map = null
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
    this.showMap()
    const { addressesById } = this.props
    const locationData = { lat: addressesById[id].lat, lng: addressesById[id].lng }
    this.addressForm.changeMode('edit')
    this.addressForm.fillData(addressesById[id])
    if (typeof locationData.lat === 'number' && typeof locationData.lng === 'number') {
      this.map.createMarker(locationData)
      this.map.moveTo(locationData)
    }
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
      this.props.editAddress({ id, street, ward, district, city, country, lat, lng })
    } else if (formMode === 'add') {
      this.props.addAddress({ street, ward, district, city, country, lat, lng })
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
    this.map.clearMarker()
  }

  showMap = () => {
    this.setState({ showMap: true })
  }

  setCurrentLocation = () => {
    this.setState({ gettingLocation: true })
    location.getCurrentLocation(({ coords }) => {
      const latlng = { lat: coords.latitude, lng: coords.longitude }
      this.map.createMarker(latlng)
      this.map.moveTo(latlng)
      location.getAddress(latlng, address => {
        const { street, ward, district, city, country } = address
        this.addressForm.fillData({ street, ward, district, city, country }, true)
        this.setState({ gettingLocation: false })
      })
    })
  }

  render() {
    const headers = ['Street', 'Ward', 'District', 'City', 'Country']
    const { editingAddress, formMode, showMap, gettingLocation } = this.state
    const { isFetching, addressesListedIds, addressesById } = this.props
    const data = addressesListedIds.map(item => {
      const { street, ward, district, city, country } = addressesById[item]
      return [street, ward, district, city, country]
    })
    const mapClasses = ['map-container']
    showMap && mapClasses.push('show')
    return (
      <main className="home-wrapper">
        <div className="form-container">
          <AddressForm
            ref={node => (this.addressForm = node)}
            mode={formMode}
            data={editingAddress}
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
          <CsvDownloader headers={headers} data={data} text={'Download'} />
        </div>
        <div className={mapClasses.join(' ')}>
          <Map ref={node => (this.map = node)} onClick={this.mapClickHandler} />
          <div className="current-location-btn" onClick={this.setCurrentLocation} />
          {gettingLocation && <Loading blockUi />}
        </div>
      </main>
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
