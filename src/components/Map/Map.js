import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { location } from 'services'
import { connect } from 'react-redux'
import { CurrentLocationButton, Loading } from 'components'

import './Map.scss'

class Map extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    currentLatlng: PropTypes.object,
    gettingCurrentLocation: PropTypes.bool,
    currentAddress: PropTypes.string,
  }

  static defaultProps = {
    onClick: () => {},
    gettingCurrentLocation: false,
  }

  componentDidMount() {
    const mapOptions = {
      center: new google.maps.LatLng(10.0, 106.0),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.marker = null
    this.infowindow = new google.maps.InfoWindow()
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions)
    google.maps.event.addListener(this.map, 'click', this.onMapClickHandler)
  }

  componentWillReceiveProps(nextProps) {
    const { currentLatlng, gettingCurrentLocation, currentAddress } = nextProps
    this.setState({ gettingCurrentLocation })
    this.clearMarker()
    this.createMarker(currentLatlng, currentAddress)
    this.moveTo(currentLatlng)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.gettingCurrentLocation !== this.props.gettingCurrentLocation
  }

  moveTo = position => {
    this.map.setCenter(position)
  }

  createMarker = (position, formatedAddress) => {
    const { lat, lng } = position
    if (typeof lat === 'number' && typeof lng === 'number') {
      this.marker = new google.maps.Marker({
        position,
        map: this.map,
      })
      if (formatedAddress) {
        this.infowindow.setContent(formatedAddress)
        this.infowindow.open(this.map, this.marker)
      }
    }
  }

  clearMarker = () => {
    if (this.marker) this.marker.setMap(null)
  }

  onMapClickHandler = e => {
    this.clearMarker()
    const position = e.latLng
    this.marker = new google.maps.Marker({
      position,
      map: this.map,
    })
    this.latlng = { lat: position.lat(), lng: position.lng() }
    this.infowindow.setContent('Loading address...')
    this.infowindow.open(this.map, this.marker)
    location.getAddress(this.latlng).then(this.showAddressOnInfoWindow)
  }

  showAddressOnInfoWindow = ({ addressObj, formatedAddress }) => {
    const { lat, lng } = this.latlng
    this.props.onClick({ ...addressObj, lat, lng })
    this.infowindow.setContent(formatedAddress)
  }

  render() {
    const { gettingCurrentLocation } = this.props
    return (
      <div className="map-wrapper">
        <div id="map" />
        <CurrentLocationButton />
        {gettingCurrentLocation && <Loading blockUi />}
      </div>
    )
  }
}

const mapStateToProps = ({ currentLocation }) => {
  return {
    currentLatlng: currentLocation.latlng,
    gettingCurrentLocation: currentLocation.gettingCurrentLocation,
    currentAddress: currentLocation.formatedAddress,
  }
}

export default connect(mapStateToProps, null, null, { withRef: true })(Map)
