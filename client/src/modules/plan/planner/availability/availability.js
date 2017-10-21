import angular from 'angular';


// imports for this component
import template from './availability.html';



class AvailabilityController {
  constructor() {
    this.title = 'This is the Availability component';
  }
}
AvailabilityController.$inject = [];

const AvailabilityComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: AvailabilityController
};

const AvailabilityModule = angular.module('app.plan.planner.availability', [])
  .component('availability', AvailabilityComponent);




export default AvailabilityModule.name;
