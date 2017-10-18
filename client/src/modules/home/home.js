// libraries
import angular from 'angular';

// component imports
import template from './home.html';
import './home.css';

class HomeController {
  constructor() {
    this.name = 'Hello world';
  }
}
HomeController.$inject = [];

const homeComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HomeController
};

const homeModule = angular.module('homeModule', [])
  .component('homeComponent', homeComponent);

export default homeModule;
