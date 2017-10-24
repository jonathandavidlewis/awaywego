import angular from 'angular';

// Child Dependencies
import ItineraryCardComponent from './itinerary-card/itinerary-card';
// imports for this component
import template from './itinerary.html';
import './itinerary.css';



class ItineraryController {
  constructor(EventService) {
    this.$inject = ['EventService'];
    this.title = 'This is the itinerary component';
    this.EventService = EventService;

  }
}

const ItineraryComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ItineraryController
};

const ItineraryModule = angular.module('app.plan.planner.itinerary', [])
  .component('itinerary', ItineraryComponent)
  .component('itineraryCard', ItineraryCardComponent);




export default ItineraryModule.name;
