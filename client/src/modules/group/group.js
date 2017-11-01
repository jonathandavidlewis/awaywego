import angular from 'angular';

// services for this module
import GroupService from '../../services/group/group.service';
import EventService from '../../services/event/event.service';

import GroupNavComponent from './group-nav/group-nav';
import FeedModule from './feed/feed';
import ExpensesModule from './expenses/expenses';
// imports for this component
import template from './group.html';
import './group.css';

class GroupController {
  constructor() {
  }
}
GroupController.$inject = [];

const GroupComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: GroupController
};

const GroupModule = angular.module('app.group', [
  FeedModule,
  ExpensesModule
])
  .component('group', GroupComponent)
  .component('groupNav', GroupNavComponent)
  .service('GroupService', GroupService)
  .service('EventService', EventService);

export default GroupModule.name;
