import angular from 'angular';
import uirouter from '@uirouter/angularjs';

// import other modules
import CommonModule from './modules/common/common';
import HomeModule from './modules/home/home';
import LoginModule from './modules/login/login';
import SignupModule from './modules/login/signup';
import PlanModule from './modules/plan/plan';
import MakePlanModule from './modules/make-plan/make-plan';
import FriendsModule from './modules/friends/friends';
import PeopleModule from './modules/plan/people/people';
import ChatModule from './modules/chat/chat';

// import global services
import UserService from './services/user/user.service';
import FriendService from './services/friend/friend.service';
import MomentService from './services/moment/moment.service';

// import global styles
import './styles/forms.css';

// imports for this component
import appRouting from './app.routing';
import template from './app.html';
import './app.css';
import PlanCardComponent from './modules/home/plan-card/plan-card';

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
  PlanModule,
  MakePlanModule,
  FriendsModule,
  PeopleModule,
  ChatModule
])
  .service('UserService', UserService)
  .service('FriendService', FriendService)
  .service('MomentService', MomentService)
  .config(appRouting)
  .component('app', AppComponent);
