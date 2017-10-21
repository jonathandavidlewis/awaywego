import angular from 'angular';

import PlanNavComponent from './plan-nav/plan-nav';
import PlannerModule from './planner/planner';
// imports for this component
import template from './plan.html';

class PlanController {
  constructor() {
    this.title = 'This is a plan title';
  }
}
PlanController.$inject = [];

const PlanComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PlanController
};

const PlanModule = angular.module('app.plan', [PlannerModule])
  .component('plan', PlanComponent)
  .component('planNav', PlanNavComponent);




export default PlanModule.name;
