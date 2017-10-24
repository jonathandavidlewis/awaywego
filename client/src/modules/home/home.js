import angular from 'angular';
// components used by this module
import PlanCardComponent from './plan-card/plan-card';
import NewPlanButtonComponent from './new-plan-button/new-plan-button';

import PlanService from '../../services/plan/plan.service';
// imports for this component
import template from './home.html';
import './home.css';

class HomeController {
  constructor(PlanService) {
    this.$inject = ['PlanService'];
    this.PlanService = PlanService;
    this.name = 'Your Plans';

    this.deletePlan = (planId) => {
      PlanService.deletePlanById(planId).then(
        this.PlanService.getAllPlans().then(this.loadPlans)
      );
    };

    this.loadPlans = (plans) => {
      console.log(plans, "plans'");
      this.plans = plans;
    };

    this.$onInit = () => {
      this.PlanService.getAllPlans().then(this.loadPlans);
    };
  }
}

const HomeComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HomeController
};

const HomeModule = angular.module('app.home', [])
  .component('home', HomeComponent)
  .component('planCard', PlanCardComponent)
  .component('newPlanButton', NewPlanButtonComponent)
  .service('PlanService', PlanService);

export default HomeModule.name;
