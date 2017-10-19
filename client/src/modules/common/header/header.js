// libraries
import angular from 'angular';

// component imports
import template from './header.html';
import './header.css';

class HeaderController {
  constructor() {
    this.header = 'AwayWeGo';
  }
}
HeaderController.$inject = [];

export const headerComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HeaderController
};
