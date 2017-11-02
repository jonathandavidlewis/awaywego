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
    this.EventService = EventService;
    this.$stateParams = $stateParams;
    this.loadEvents = this.loadEvents.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.demoteEvent = this.demoteEvent.bind(this);
    this.$onInit = this.$onInit.bind(this);
  }

  loadEvents(events) {
    this.events = events.filter((event) => event.status === 'itinerary');
  }

  deleteEvent(eventId) {
    this.EventService.deleteEvent(eventId).then(() => {
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then(this.loadEvents);
    });
  }

  demoteEvent(eventId) {
    this.EventService.demoteEvent(eventId).then(() => {
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then(this.loadEvents);
    });
  }

  $onInit() {
    this.EventService.loadEventsByPlanId(this.$stateParams.planId).then(this.loadEvents);
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
