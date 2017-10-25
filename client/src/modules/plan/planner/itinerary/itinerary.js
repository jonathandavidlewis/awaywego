import angular from 'angular';

// Child Dependencies
import ItineraryCardComponent from './itinerary-card/itinerary-card';
// imports for this component
import EventService from '../../../../services/event/event.service';
import template from './itinerary.html';
import './itinerary.css';



class ItineraryController {
<<<<<<< 36556f0283a859a6762eeac1c8b87410a0b54268
  constructor(EventService, $stateParams) {
    this.title = 'This is the itinerary component';
    this.$stateParams = $stateParams;
    this.EventService = EventService;
    this.events = this.EventService.events;
=======
  constructor($stateParams, EventService) {
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
    this.EventService.deleteEvent(eventId).then(
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then((events) => {
        this.loadIdeas(events);
      })
    );
  }

  demoteEvent(eventId) {
    this.EventService.demoteEvent(eventId).then(
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then((events) => {
        this.loadEvents(events);
      })
    );
>>>>>>> Add descriptions to event cards
  }

  $onInit() {
    this.EventService.loadEventsByPlanId(this.$stateParams.planId).then((events) => {
<<<<<<< 36556f0283a859a6762eeac1c8b87410a0b54268
      this.events = events;
    });
  }
}

ItineraryController.$inject = ['EventService', '$stateParams'];
=======
      this.loadEvents(events);
    });
  }
}
ItineraryController.$inject = ['$stateParams', 'EventService'];
>>>>>>> Add descriptions to event cards

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
