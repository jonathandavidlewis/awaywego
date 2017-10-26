import angular from 'angular';
// components used by this module
import PlanCardComponent from './plan-card/plan-card';

import PlanService from '../../services/plan/plan.service';
// imports for this component
import template from './home.html';
import './home.css';

class HomeController {
  constructor(PlanService) {
    this.PlanService = PlanService;
    this.loadPlans = this.loadPlans.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.$onInit = this.$onInit.bind(this);
  }

  loadPlans(plans) {
    this.plans = plans;
  }

  deletePlan(planId) {
    this.PlanService.deletePlanById(planId).then(
      this.PlanService.getAllPlans().then(this.loadPlans)
    );
  }

  $onInit() {
    this.PlanService.getAllPlans().then(this.loadPlans);
  }

}

HomeController.$inject = ['PlanService'];

const HomeComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HomeController
};

const HomeModule = angular.module('app.home', [])
  .component('home', HomeComponent)
  .component('planCard', PlanCardComponent)
  .service('PlanService', PlanService);

export default HomeModule.name;
