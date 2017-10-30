import angular from 'angular';

// import services for this modules
import PlanService from '../../services/plan/plan.service';
import ImageSearchService from '../../services/images/image.search.service';

// imports for this component
import template from './make-plan.html';
import './make-plan.css';

class MakePlanController {
  constructor($state, PlanService, ImageSearchService) {
    this.$inject = ['$state', 'PlanService', '$http'];
    this.$state = $state;
    this.PlanService = PlanService;
    this.ImageSearchService = ImageSearchService;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.formWarning = '';
    this.host = 'https://api.cognitive.microsoft.com';
    this.path = '/bing/v7.0/images/search';
    this.subKey = 'e8ae475ded96446c8641f0aa607e623b';
    this.search = '';
    this.images = [];
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

  imageSearch(query) {
    this.ImageSearchService.imageSearch(query).then(resp => {
      this.images = resp;
    });
  }

  imageClick(e) {
    this.imageUrl = e.target.currentSrc;
    $('.make-plan-images img').removeClass('highlight');
    $(e.target).addClass('highlight');
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
  .service('PlanService', PlanService)
  .service('ImageSearchService', ImageSearchService);

export default MakePlanModule.name;
