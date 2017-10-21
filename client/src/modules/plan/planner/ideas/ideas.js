import angular from 'angular';


// imports for this component
import template from './ideas.html';



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
  .component('ideas', IdeasComponent);




export default IdeasModule.name;
