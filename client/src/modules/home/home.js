import angular from 'angular';
// components used by this module
import GroupCardComponent from './group-card/group-card';
import ImageSearchComponent from '../image-search/image-search';

import GroupService from '../../services/group/group.service';
// imports for this component
import template from './home.html';
import './home.css';

class HomeController {
  constructor(GroupService) {
    this.GroupService = GroupService;
  }
}

HomeController.$inject = ['GroupService'];

const HomeComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: HomeController
};

const HomeModule = angular.module('app.home', [])
  .component('home', HomeComponent)
  .component('groupCard', GroupCardComponent)
  .component('imageSearch', ImageSearchComponent)
  .service('GroupService', GroupService);

export default HomeModule.name;
