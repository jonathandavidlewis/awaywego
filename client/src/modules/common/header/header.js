import angular from 'angular';

// imports for this component
import template from './header.html';
import './header.css';

class HeaderController {
  constructor() {
    this.header = 'AwayWeGo';
  }
}
HeaderController.$inject = [];

export const HeaderComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HeaderController
};
