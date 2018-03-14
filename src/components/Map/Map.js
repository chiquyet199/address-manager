import React, { Component } from 'react'

import './Map.scss'

class Map extends Component {
  componentDidMount() {
    const mapOptions = {
      center: new google.maps.LatLng(10.0, 106.0),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.addressMarker = null
    this.geocoder = new google.maps.Geocoder()
    this.infowindow = new google.maps.InfoWindow()
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions)
    google.maps.event.addListener(this.map, 'click', this.onMapClickHandler)
  }

  onMapClickHandler = e => {
    if (this.addressMarker) this.addressMarker.setMap(null)
    const position = e.latLng
    this.addressMarker = new google.maps.Marker({
      position,
      map: this.map,
    })
    this.latlng = { lat: position.lat(), lng: position.lng() }
    this.geocoder.geocode({ location: this.latlng }, this.getAddressFromMarker)
  }

  getAddressFromMarker = (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        // console.log('---', results[0].formatted_address)
        this.infowindow.setContent(results[0].formatted_address)
        this.infowindow.open(this.map, this.marker)
      } else {
        window.alert('No results found')
      }
    } else {
      window.alert('Geocoder failed due to: ' + status)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div id="map" />
  }
}

export default Map
