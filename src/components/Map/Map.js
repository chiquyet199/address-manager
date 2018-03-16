import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { location } from 'services'

import './Map.scss'

class Map extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onClick: () => {},
  }

  componentDidMount() {
    const mapOptions = {
      center: new google.maps.LatLng(10.0, 106.0),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.addressMarker = null
    this.infowindow = new google.maps.InfoWindow()
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions)
    google.maps.event.addListener(this.map, 'click', this.onMapClickHandler)
  }

  shouldComponentUpdate() {
    return false
  }

  moveTo = position => {
    this.map.panTo(position)
  }

  createMarker = position => {
    this.addressMarker = new google.maps.Marker({
      position,
      map: this.map,
    })
  }

  clearMarker = () => {
    if (this.addressMarker) this.addressMarker.setMap(null)
  }

  onMapClickHandler = e => {
    this.clearMarker()
    const position = e.latLng
    this.addressMarker = new google.maps.Marker({
      position,
      map: this.map,
    })
    this.latlng = { lat: position.lat(), lng: position.lng() }
    location.getAddress(this.latlng, this.showAddressOnInfoWindow)
  }

  showAddressOnInfoWindow = (addressObj, formatedAddress) => {
    const { lat, lng } = this.latlng
    this.props.onClick({ ...addressObj, lat, lng })
    this.infowindow.setContent(formatedAddress)
    this.infowindow.open(this.map, this.addressMarker)
  }

  render() {
    return <div id="map" />
  }
}

export default Map
