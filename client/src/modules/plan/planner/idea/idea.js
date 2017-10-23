import angular from 'angular';

// import child dependencies


// imports for this component
import template from './idea.html';
import './idea.css';



class IdeaController {
  constructor() {
    this.title = 'This is the idea component';
  }
}
IdeaController.$inject = [];

const IdeaComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: IdeaController
};

const IdeaModule = angular.module('app.plan.planner.idea', [])
  .component('idea', IdeaComponent);



export default IdeaModule.name;