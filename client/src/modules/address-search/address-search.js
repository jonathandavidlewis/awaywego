import angular from 'angular';

// imports for this component
import template from './address-search.html';
import './address-search.css';

class AddressSearchController {
  constructor() {
  }

  $onInit() {
    this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),
      {types: []});

    this.autocomplete.addListener('place_changed', this.getLocation.bind(this));
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());
      }.bind(this));
    }
  }

  getLocation() {
    let location = this.autocomplete.getPlace();
    this.addressName = location.name;
    this.addressText = location.formatted_address;
    this.addressLink = location.url;
  }
}

AddressSearchController.$inject = [];

const AddressSearchComponent = {
  restrict: 'E',
  bindings: {
    addressName: '=',
    addressText: '=',
    addressLink: '='
  },
  template: template,
  controller: AddressSearchController
};

export default AddressSearchComponent;