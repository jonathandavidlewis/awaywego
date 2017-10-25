import angular from 'angular';

// services for this module
import PlanService from '../../services/plan/plan.service';
import EventService from '../../services/event/event.service';

import PlanNavComponent from './plan-nav/plan-nav';
import FeedModule from './feed/feed';
import PlannerModule from './planner/planner';
// imports for this component
import template from './plan.html';
import './plan.css';

class PlanController {
  constructor() {
  }
}
PlanController.$inject = [];

const PlanComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PlanController
};

const PlanModule = angular.module('app.plan', [
  FeedModule,
  PlannerModule
])
  .component('plan', PlanComponent)
  .component('planNav', PlanNavComponent)
  .service('PlanService', PlanService)
  .service('EventService', EventService);

export default PlanModule.name;
