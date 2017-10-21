import angular from 'angular';

// imports for this component
import template from './plan-nav.html';

class PlanNavController {
  constructor() {
    this.planId = 'sample';
  }
}
PlanNavController.$inject = [];

const PlanNavComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PlanNavController
};


export default PlanNavComponent;