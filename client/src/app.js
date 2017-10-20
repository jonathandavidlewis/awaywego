import angular from 'angular';
import uirouter from '@uirouter/angularjs';

// import other modules
import CommonModule from './modules/common/common';
import HomeModule from './modules/home/home';
import LoginModule from './modules/login/login';
import SignupModule from './modules/login/signup';

// import global services
import UserService from './services/user/user.service';

// imports for this component
import appRouting from './app.routing';
import template from './app.html';
import './app.css';

class AppController {
  constructor(UserService) {
    this.UserService = UserService;
  }
}
AppController.$inject = ['UserService'];

const AppComponent = {
  template: template,
  controller: AppController
};

angular.module('app', [
  uirouter,
  CommonModule,
  HomeModule,
  LoginModule,
  SignupModule,
])
  .service('UserService', UserService)
  .config(appRouting)
  .component('app', AppComponent);
