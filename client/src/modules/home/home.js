import angular from 'angular';
// components used by this module
import PlanCardComponent from './plan-card/plan-card';
import NewPlanButtonComponent from './new-plan-button/new-plan-button';

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
        title: "Weekend Getaway",
        description: "Lets go out to the deasert this weekensd and have a ton of fun. We will be meeting up over by the catus.",
        imageUrl: "http://imaging.nikon.com/lineup/dslr/d600/img/sample01/img_01.png"
      },
      {
        title: "Going to the Beach",
        description: "Summer is coming, so lets go to the beach!",
        imageUrl: "http://imaging.nikon.com/lineup/dslr/d600/img/sample01/img_01.png"
      }
    ];
    this.$onInit = function () {
      PlanService.getPlan('/api/plan', {}, this.loadPlans);
    };
  }

  loadPlans(plans) {
    this.plans = plans;
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
  .component('newPlanButton', NewPlanButtonComponent)
  .service('PlanService', PlanService);

export default HomeModule.name;
