import angular from 'angular';

// import child dependencies
import IdeasCardComponent from './ideas-card/ideas-card.js';

// imports for this component
import EventService from '../../../../services/event/event.service';
import template from './ideas.html';
import './ideas.css';



class IdeasController {
  constructor(EventService, $stateParams) {
    this.title = 'This is the ideas component';
    this.$stateParams = $stateParams;
    this.EventService = EventService;
    this.events = this.EventService.events;
  }
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
  .component('ideasCard', IdeasCardComponent);




export default IdeasModule.name;
