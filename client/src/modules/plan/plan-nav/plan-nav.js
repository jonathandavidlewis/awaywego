import angular from 'angular';

// imports for this component
import template from './plan-nav.html';
import './plan-nav.css';

class PlanNavController {
  constructor($state) {
    this.$state = $state;
  }
}
PlanNavController.$inject = ['$state'];

const PlanNavComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PlanNavController
};


export default PlanNavComponent;
