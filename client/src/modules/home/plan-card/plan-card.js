import angular from 'angular';

// imports for this component
import template from './plan-card.html';
import './plan-card.css';

class PlanCardController {
  constructor() {
    this.name = 'This is a plan title';
    this. handleDeleteClick = () => {
      this.deletePlan(this.plan._id);
    };
  }
}

const PlanCardComponent = {
  restrict: 'E',
  bindings: {
    plan: '<',
    deletePlan: '<'
  },
  template: template,
  controller: PlanCardController
};


export default PlanCardComponent;