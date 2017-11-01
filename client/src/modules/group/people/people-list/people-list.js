import angular from 'angular';

// imports for this component
import template from './people-list.html';
import './people-list.css';

class PeopleListController {
  constructor(GroupService, FriendService, UserService) {
    this.GroupService = GroupService;
    this.UserService = UserService;
    this.groupOwner = '';
    this.groupMembers = [];
    this.refreshGroup();
    this.remove = this.remove.bind(this);
  }

  refreshGroup() {
    this.groupOwner = this.GroupService.currentGroup.userId;
    this.groupMembers = this.GroupService.currentGroup.members;
  }

  remove(userId) {
    this.GroupService.removeMemberFromCurrentGroup(userId)
      .then(() => this.refreshGroup());
  }

}
PeopleListController.$inject = ['GroupService', 'FriendService', 'UserService'];

const PeopleListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleListController
};

export default PeopleListComponent;
