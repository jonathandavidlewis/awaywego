import angular from 'angular';

// imports for this component
import template from './group-card.html';
import './group-card.css';

class GroupCardController {
  constructor(UserService, GroupService) {
    this.UserService = UserService;
    this.GroupService = GroupService;
  }

  canLeave() {
    return this.UserService.user.id !== this.group.userId;
  }

  canDelete() {
    return this.UserService.user.id === this.group.userId;
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
