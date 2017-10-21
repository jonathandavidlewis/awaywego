import angular from 'angular';


// imports for this component
import template from './itinerary.html';



class ItineraryController {
  constructor() {
    this.title = 'This is the itinerary component';
  }
}
ItineraryController.$inject = [];

const ItineraryComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ItineraryController
};

const ItineraryModule = angular.module('app.plan.planner.itinerary', [])
  .component('itinerary', ItineraryComponent);




export default ItineraryModule.name;
