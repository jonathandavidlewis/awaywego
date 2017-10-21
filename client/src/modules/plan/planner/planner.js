import angular from 'angular';


// imports for this component
import template from './planner.html';
import ItineraryModule from './itinerary/itinerary';


class PlannerController {
  constructor() {
    this.title = 'This is the planner component';
  }
}
PlannerController.$inject = [];

const PlannerComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PlannerController
};

const PlannerModule = angular.module('app.plan.planner', [ItineraryModule])
  .component('planner', PlannerComponent);




export default PlannerModule.name;
