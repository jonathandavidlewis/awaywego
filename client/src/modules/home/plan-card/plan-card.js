import angular from 'angular';

// imports for this component
import template from './plan-card.html';
import './plan-card.css';

class PlanCardController {
  constructor() {
    this.name = 'This is a plan title';
  }
}
PlanCardController.$inject = [];

const PlanCardComponent = {
  restrict: 'E',
  bindings: {
    plan: '<'
  },
  template: template,
  controller: PlanCardController
};


export default PlanCardComponent;