import angular from 'angular';
import _ from 'lodash';

// import child dependencies
import IdeasCardComponent from './ideas-card/ideas-card.js';
import NewIdeaButtonComponent from './new-idea-button/new-idea-button';

// imports for this component
import EventService from '../../../../services/event/event.service';
import template from './ideas.html';
import './ideas.css';

class IdeasController {
  constructor(EventService, PlanService) {
    this.EventService = EventService;
    this.planId = PlanService.currentPlan._id;
    this.ideas = EventService.ideas;

    this.deleteEvent = this.deleteEvent.bind(this);
    this.promoteEvent = this.promoteEvent.bind(this);
  }

  deleteEvent(eventId) {
    this.EventService.deleteEvent(eventId).then(() => {
      this.EventService.loadEventsByPlanId(this.planId);
    });
  }

  promoteEvent(eventId) {
    this.EventService.promoteEvent(eventId).then(() => {
      this.EventService.loadEventsByPlanId(this.planId);
    });
  }
}
IdeasController.$inject = ['EventService', 'PlanService'];

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
