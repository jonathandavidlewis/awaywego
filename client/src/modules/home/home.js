// libraries
import angular from 'angular';

// component imports
import template from './home.html';
import './home.css';

class HomeComponent {
  constructor() {
    this.name = 'This is the home screen.';
  }
}
HomeComponent.$inject = [];

const homeComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HomeComponent
};

const homeModule = angular.module('homeModule', [])
  .component('homeComponent', homeComponent);

export default homeModule;
