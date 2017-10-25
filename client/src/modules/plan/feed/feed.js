import angular from 'angular';
// components used by this module

import PlanService from '../../../services/plan/plan.service';
// imports for this component
import template from './feed.html';
import './feed.css';

class FeedController {
  constructor($stateParams, PlanService) {
    this.$stateParams = $stateParams;
    this.plan = PlanService.currentPlan;
  }
}

FeedController.$inject = ['$stateParams', 'PlanService'];

const FeedComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FeedController
};

const FeedModule = angular.module('app.plan.feed', [])
  .component('feed', FeedComponent);

export default FeedModule.name;
