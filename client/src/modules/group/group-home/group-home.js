import angular from 'angular';
// components used by this module

import GroupService from '../../../services/group/group.service';
// imports for this component
import template from './group-home.html';
import './group-home.css';

class GroupHomeController {
  constructor(GroupService) {
    this.GroupService = GroupService;
  }
}

GroupHomeController.$inject = ['GroupService'];

const GroupHomeComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: GroupHomeController
};

const GroupHomeModule = angular.module('app.group.home', [])
  .component('group-home', GroupHomeComponent);

export default GroupHomeModule.name;
