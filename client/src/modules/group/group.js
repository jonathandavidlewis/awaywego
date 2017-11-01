import angular from 'angular';

// services and other module dependencies
import GroupService from '../../services/group/group.service';
import EventService from '../../services/event/event.service';
import GroupNavComponent from './group-nav/group-nav';
import GroupHomeModule from './group-home/group-home';
import IdeasModule from './ideas/ideas';
import ExpensesModule from './expenses/expenses';
import ChatModule from './chat/chat';
import PeopleModule from './people/people';

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
// TODO: add back in ExpensesModule
const GroupModule = angular.module('app.group', [
  GroupHomeModule,
  IdeasModule,
  ExpensesModule,
  ChatModule,
  PeopleModule
])
  .component('group', GroupComponent)
  .component('groupNav', GroupNavComponent)
  .service('GroupService', GroupService)
  .service('EventService', EventService);

export default GroupModule.name;
