import angular from 'angular';

// import child dependencies
import IdeasCardComponent from './ideas-card/ideas-card.js';
import NewIdeaButtonComponent from './new-idea-button/new-idea-button';


// imports for this component
import template from './ideas.html';
import './ideas.css';



class IdeasController {
  constructor($stateParams, EventService) {
    this.EventService = EventService;
    this.title = 'This is the ideas component';
    this.$stateParams = $stateParams;
    this.loadIdeas = this.loadIdeas.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.promoteEvent = this.promoteEvent.bind(this);
    this.$onInit = this.$onInit.bind(this);
  }

  loadIdeas(events) {
    this.ideas = events.filter((event) => event.status === 'idea');
  }

  deleteEvent(eventId) {
    this.EventService.deleteEvent(eventId).then(
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then((events) => {
        this.loadIdeas(events);
      })
    );
  }

  promoteEvent(eventId) {
    this.EventService.promoteEvent(eventId).then(
      this.EventService.loadEventsByPlanId(this.$stateParams.planId).then((events) => {
        this.loadIdeas(events);
      })
    );
  }

  $onInit() {
    this.EventService.loadEventsByPlanId(this.$stateParams.planId).then((events) => {
      this.loadIdeas(events);
    });
  }
}
IdeasController.$inject = ['$stateParams', 'EventService'];

const IdeasComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: IdeasController
};

const IdeasModule = angular.module('app.event.eventner.ideas', [])
  .component('ideas', IdeasComponent)
  .component('ideasCard', IdeasCardComponent)
  .component('newIdeaButton', NewIdeaButtonComponent);




export default IdeasModule.name;
