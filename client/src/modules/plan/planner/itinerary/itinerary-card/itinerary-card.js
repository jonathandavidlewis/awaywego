import angular from 'angular';
import moment from 'moment';
// imports for this component
import template from './itinerary-card.html';
import './itinerary-card.css';

class ItineraryCardController {
  constructor() {
    this.planId = 'sample';
  }
}
ItineraryCardController.$inject = [];

const ItineraryCardComponent = {
  restrict: 'E',
  bindings: {
    event: '<'
  },
  template: template,
  controller: ItineraryCardController
};


export default ItineraryCardComponent;
