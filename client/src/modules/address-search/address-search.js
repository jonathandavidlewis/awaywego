import angular from 'angular';

// imports for this component
import template from './address-search.html';
import './address-search.css';

class AddressSearchController {
  constructor(AddressService) {
    this.AddressService = AddressService;
    this.search = '';
    this.images = [];
    this.spinner = false;
  }

  $onInit() {
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  }

  fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
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
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }
  // imageSearch(query) {
  //   this.images = [];
  //   this.spinner = true;
  //   this.AddressService.imageSearch(query).then(resp => {
  //     this.spinner = false;
  //     this.images = resp;
  //   });
  // }

  // imageClick(e) {
  //   this.imageUrl = e.target.currentSrc;
  //   $('.make-plan-images img').removeClass('highlight');
  //   $(e.target).addClass('highlight');
  // }
}

AddressSearchController.$inject = ['AddressService'];

const AddressSearchComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: AddressSearchController
};

export default AddressSearchComponent;