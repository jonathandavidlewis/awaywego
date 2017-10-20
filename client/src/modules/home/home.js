import angular from 'angular';

// imports for this component
import template from './home.html';
import './home.css';

class HomeController {
  constructor() {
    this.name = 'Welcome to the home screen.';
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
  .component('home', HomeComponent);

export default HomeModule.name;
