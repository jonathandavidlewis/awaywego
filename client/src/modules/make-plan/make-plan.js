import angular from 'angular';

// imports for this component
import template from './make-plan.html';
import './make-plan.css';

class MakePlanController {
  constructor($state) {
    this.$inject = ['$state'];
    this.$state = $state;
    this.title = '';
    this.desc = '';
    this.imageUrl = '';
    this.formWarning = '';
  }
}

const MakePlanComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: MakePlanController
};

const MakePlanModule = angular.module('app.makePlan', [])
  .component('makePlan', MakePlanComponent);

export default MakePlanModule.name;
