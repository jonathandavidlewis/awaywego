import angular from 'angular';

// imports for this component
import template from './group-card.html';
import './group-card.css';

class GroupCardController {
  constructor(UserService, GroupService) {
    this.UserService = UserService;
    this.GroupService = GroupService;
  }
}
GroupCardController.$inject = ['UserService', 'GroupService'];

const GroupCardComponent = {
  restrict: 'E',
  bindings: {
    group: '<'
  },
  template: template,
  controller: GroupCardController
};

export default GroupCardComponent;
