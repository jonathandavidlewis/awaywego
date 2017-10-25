import angular from 'angular';

// Child Dependencies
import ItineraryCardComponent from './itinerary-card/itinerary-card';
// imports for this component
import EventService from '../../../../services/event/event.service';
import template from './itinerary.html';
import './itinerary.css';



class ItineraryController {
  constructor(EventService, $stateParams) {
    this.title = 'This is the itinerary component';
    this.$stateParams = $stateParams;
    this.EventService = EventService;
    this.events = this.EventService.events;
  }

  $onInit() {
    this.EventService.loadEventsByPlanId(this.$stateParams.planId).then((events) => {
      this.events = events;
    });
  }
}

ItineraryController.$inject = ['EventService', '$stateParams'];

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
