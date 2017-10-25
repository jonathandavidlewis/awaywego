import angular from 'angular';

// import child dependencies
import IdeasCardComponent from './ideas-card/ideas-card.js';
import NewIdeaButtonComponent from './new-idea-button/new-idea-button';


// imports for this component
import EventService from '../../../../services/event/event.service';
import template from './ideas.html';
import './ideas.css';



class IdeasController {
<<<<<<< 36556f0283a859a6762eeac1c8b87410a0b54268
<<<<<<< aa4c33d80d730dd1bf24c5bbbd36e7843992e90a
  constructor(EventService, $stateParams) {
    this.title = 'This is the ideas component';
    this.$stateParams = $stateParams;
    this.EventService = EventService;
    this.events = this.EventService.events;
=======
  constructor($stateParams, EventService, $scope) {
=======
  constructor($stateParams, EventService) {
>>>>>>> Add descriptions to event cards
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
>>>>>>> Adds live events to idea page
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
<<<<<<< aa4c33d80d730dd1bf24c5bbbd36e7843992e90a
      this.events = events;
    });
  }
}
IdeasController.$inject = ['EventService', '$stateParams'];
=======
      this.loadIdeas(events);
    });
  }
}
<<<<<<< 36556f0283a859a6762eeac1c8b87410a0b54268
IdeasController.$inject = ['$stateParams', 'EventService', '$scope'];
>>>>>>> Adds live events to idea page
=======
IdeasController.$inject = ['$stateParams', 'EventService'];
>>>>>>> Add descriptions to event cards

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
