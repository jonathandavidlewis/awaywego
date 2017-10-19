import angular from 'angular';
import uirouter from '@uirouter/angularjs';

// import other modules
import CommonModule from './modules/common/common';
import HomeModule from './modules/home/home';

// import global services
import UserService from './services/user/user.service';

// imports for this component
import appRouting from './app.routing';
import template from './app.html';
import './app.css';

const AppComponent = {
  template: template
};

angular.module('app', [
  uirouter,
  CommonModule,
  HomeModule,
])
  .config(appRouting)
  .service('UserService', UserService)
  .component('app', AppComponent);
