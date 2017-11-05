import angular from 'angular';

// imports for this component
import template from './people-list.html';
import './people-list.css';

class PeopleListController {
  constructor(GroupService, FriendService, UserService, ConfirmService) {
    this.GroupService = GroupService;
    this.UserService = UserService;
    this.ConfirmService = ConfirmService;
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
    this.ConfirmService.openModal(
      'Are you sure you want to remove this user from the group?',
      'This action cannot be undone'
    ) .then(() => {
      this.GroupService.removeMemberFromCurrentGroup(userId)
        .then(() => this.refreshGroup());
    }).catch(() => {});
  }

}
PeopleListController.$inject = ['GroupService', 'FriendService', 'UserService', 'ConfirmService'];

const PeopleListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleListController
};

export default PeopleListComponent;
