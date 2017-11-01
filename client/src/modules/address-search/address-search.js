import angular from 'angular';

// imports for this component
import template from './address-search.html';
import './address-search.css';

class AddressSearchController {
  constructor(AddressService) {
    this.AddressService = AddressService;
  }

  $onInit() {
    this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),
      {types: []});
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

  click() {
    this.addressText = 'text';
    this.addressLink = 'link';
  }
}

AddressSearchController.$inject = ['AddressService'];

const AddressSearchComponent = {
  restrict: 'E',
  bindings: {
    addressText: '=',
    addressLink: '='
  },
  template: template,
  controller: AddressSearchController
};

export default AddressSearchComponent;