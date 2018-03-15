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

  onMapClickHandler = e => {
    if (this.addressMarker) this.addressMarker.setMap(null)
    const position = e.latLng
    this.addressMarker = new google.maps.Marker({
      position,
      map: this.map,
    })
    const latlng = { lat: position.lat(), lng: position.lng() }
    location.getAddress(latlng, this.showAddressOnInfoWindow)
  }

  showAddressOnInfoWindow = address => {
    // console.log(address)
    const data = address.split(',')
    const length = data.length
    this.props.onClick({
      street: data[0],
      ward: length > 4 ? data[length - 4] : '',
      district: data[length - 3],
      city: data[length - 2],
      country: data[length - 1],
    })
    this.infowindow.setContent(address)
    this.infowindow.open(this.map, this.addressMarker)
  }

  render() {
    return <div id="map" />
  }
}

export default Map
