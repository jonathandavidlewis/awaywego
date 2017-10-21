import angular from 'angular';

// imports for this component
import template from './new-plan-button.html';
import './new-plan-button.css';

class NewPlanButtonController {
  constructor() {
    this.name = 'This is a plan title';
  }
}

const NewPlanButtonComponent = {
  restrict: 'E',
  bindings: {
    plan: '<'
  },
  template: template,
  controller: NewPlanButtonController
};


export default NewPlanButtonComponent;