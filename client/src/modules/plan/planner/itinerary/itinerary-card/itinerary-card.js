import angular from 'angular';

// imports for this component
import template from './itinerary-card.html';
import './itinerary-card.css';

class ItineraryCardController {
  constructor() {
    this.planId = 'sample';
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDemoteClick = this.handleDemoteClick.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.event._id);
  }

  handleDemoteClick() {
    this.demoteEvent(this.event._id);
  }
}
ItineraryCardController.$inject = [];



const ItineraryCardComponent = {
  restrict: 'E',
  bindings: {
    demoteEvent: '<',
    deleteEvent: '<'
  },
  template: template,
  controller: ItineraryCardController
};


export default ItineraryCardComponent;
