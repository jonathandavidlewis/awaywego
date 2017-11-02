import angular from 'angular';

// import child Modules
import ItineraryModule from './itinerary/itinerary';
import IdeasModule from './ideas/ideas';
import IdeaModule from './idea/idea';
import AvailabilityModule from './availability/availability';
import MakeIdeaModule from './make-idea/make-idea';
import PromoteIdeaModule from './promote-idea/promote-idea';

// imports for this component
import template from './planner.html';
import './planner.css';

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

const PlannerModule = angular.module('app.plan.planner', [
  ItineraryModule,
  IdeasModule,
  IdeaModule,
  AvailabilityModule,
  MakeIdeaModule,
  PromoteIdeaModule
])
  .component('planner', PlannerComponent);




export default PlannerModule.name;
