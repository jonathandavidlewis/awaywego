import angular from 'angular';

// import services for this modules
import PlanService from '../../services/plan/plan.service';

// imports for this component
import template from './make-plan.html';
import './make-plan.css';

class MakePlanController {
  constructor($state, PlanService) {
    this.$inject = ['$state', 'PlanService'];
    this.$state = $state;
    this.PlanService = PlanService;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.formWarning = '';
  }

  submit() {
    if (this.validateForm()) {
      let newPlan = {
        title: this.title,
        description: this.desc,
        imageUrl: this.imageUrl
      };
      this.PlanService.submitNewPlan(newPlan).then(resp => {
        this.$state.go('app.home');
      }).catch(err => {
        console.log('Server error: ', err);
        this.formWarning = 'Error: please try again or contact a server admin';
      });
    }
  }

  validateForm() {
    if (!this.title) {
      this.formWarning = 'Please enter at least a title';
      return false;
    }
    return true;
  }
}

const MakePlanComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakePlanController
};

const MakePlanModule = angular.module('app.makePlan', [])
  .component('makePlan', MakePlanComponent)
  .service('PlanService', PlanService);

export default MakePlanModule.name;
