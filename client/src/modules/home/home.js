import angular from 'angular';
// components used by this module
import PlanCardComponent from './plan-card/plan-card';

import PlanService from './home-services/plan.service';
// imports for this component
import template from './home.html';
import './home.css';

class HomeController {
  constructor(PlanService) {
    this.name = 'Your Plans';
    this.PlanService = PlanService;
    this.plans = [
      {
        title: "planTitle",
        description: "planDescription"
      },
      {
        title: "plan 2",
        description: "planDescription 2"
      }
    ]
  }
}
HomeController.$inject = [];

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
