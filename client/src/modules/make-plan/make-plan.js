import angular from 'angular';

// import services for this modules
import PlanService from '../../services/plan/plan.service';

// imports for this component
import template from './make-plan.html';
import './make-plan.css';

class MakePlanController {
  constructor($state, PlanService, $http) {
    this.$inject = ['$state', 'PlanService', '$http'];
    this.$state = $state;
    this.PlanService = PlanService;
    this.$http = $http;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.formWarning = '';
    this.host = 'https://api.cognitive.microsoft.com';
    this.path = '/bing/v7.0/images/search';
    this.subKey = 'e8ae475ded96446c8641f0aa607e623b';
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
    return this.$http({
      method: 'GET',
      url: this.host + this.path + '?q=' + encodeURIComponent(query),
      headers: {
        'Ocp-Apim-Subscription-Key': this.subKey
      }
    }).then((resp) => {
      let imageArray = resp.data.value;
      this.images = [];
      for (let i = 0; i < 6; i++) {
        this.images.push(imageArray[i].thumbnailUrl);
      }
      console.log(resp.data.value);
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
  .service('PlanService', PlanService);

export default MakePlanModule.name;
