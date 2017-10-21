import angular from 'angular';

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
  bindings: {},
  template: template,
  controller: ItineraryCardController
};


export default ItineraryCardComponent;
