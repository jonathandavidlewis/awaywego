import angular from 'angular';

// components used by this module
import EventFeedComponent from './event-feed/event-feed';
import EventFeedCardComponent from './event-feed/event-feed-card/event-feed-card';
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
  .component('groupHome', GroupHomeComponent)
  .component('eventFeed', EventFeedComponent)
  .component('eventFeedCard', EventFeedCardComponent);

export default GroupHomeModule.name;
