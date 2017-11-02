import angular from 'angular';

// imports for this component
import template from './header.html';
import './header.css';

class HeaderController {
  constructor(UserService) {
    this.header = 'StartSomething';
    this.UserService = UserService;
  }

  logout() { this.UserService.logout(); }
}
HeaderController.$inject = ['UserService'];

export const HeaderComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HeaderController
};
