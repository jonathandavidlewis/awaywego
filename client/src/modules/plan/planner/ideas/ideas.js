import angular from 'angular';

// import child dependencies
import IdeasCardComponent from './ideas-card/ideas-card.js';

// imports for this component
import template from './ideas.html';
import './ideas.css';



class IdeasController {
  constructor() {
    this.title = 'This is the ideas component';
  }
}
IdeasController.$inject = [];

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
