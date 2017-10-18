import angular from 'angular';
import uirouter from '@uirouter/angularjs';

import routing from './app-routing';

import homeModule from './modules/home/home';


angular.module('app', [
  uirouter,
  homeModule.name
])
  .config(routing);
