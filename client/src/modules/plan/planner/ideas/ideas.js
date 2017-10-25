import angular from 'angular';

// import child dependencies
import IdeasCardComponent from './ideas-card/ideas-card.js';
import NewIdeaButtonComponent from './new-idea-button/new-idea-button';


// imports for this component
import EventService from '../../../../services/event/event.service';
import template from './ideas.html';
import './ideas.css';



class IdeasController {
  constructor(EventService, $stateParams) {
    this.EventService = EventService;
    this.$stateParams = $stateParams;
    this.loadEvents = this.loadEvents.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.promoteEvent = this.promoteEvent.bind(this);
    this.$onInit = this.$onInit.bind(this);
  }

  loadEvents(events) {
    this.events = events.filter((event) => event.status === 'idea');
  }

  deleteEvent(eventId) {
    this.EventService.deleteEvent(eventId).then(() => {
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then(this.loadEvents);
    });
  }

<<<<<<< caf10875381bb483f99a8a5885cab9b8e2037f0b
  promoteEvent(eventId) {
    this.EventService.promoteEvent(eventId).then(() => {
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then(this.loadEvents);
    });
  }

  $onInit() {
    this.EventService.loadEventsByPlanId(this.$stateParams.planId).then(this.loadEvents);
  }
=======

>>>>>>> upvoting and downvoting responsively changing on one user end
}
IdeasController.$inject = ['EventService', '$stateParams'];

const IdeasComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: IdeasController
};

const IdeasModule = angular.module('app.plan.planner.ideas', [])
  .component('ideas', IdeasComponent)
  .component('ideasCard', IdeasCardComponent)
  .component('newIdeaButton', NewIdeaButtonComponent);

export default IdeasModule.name;
