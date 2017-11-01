import angular from 'angular';

// imports for this component
import template from './address-search.html';
import './address-search.css';

class AddressSearchController {
  constructor(AddressService) {
    this.AddressService = AddressService;
    this.autocomplete = {};
    this.$onInit = this.$onInit.bind(this);
    this.geolocate = this.geolocate.bind(this);
  }

  $onInit() {
    console.log(this);
    this.autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    // this.autocomplete.addListener('place_changed', this.fillInAddress);
    console.log(this.autocomplete);
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
}

AddressSearchController.$inject = ['AddressService'];

const AddressSearchComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: AddressSearchController
};

export default AddressSearchComponent;