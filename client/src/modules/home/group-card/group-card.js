import angular from 'angular';

// imports for this component
import template from './group-card.html';
import './group-card.css';

class GroupCardController {
  constructor(UserService, GroupService, ConfirmService) {
    this.UserService = UserService;
    this.GroupService = GroupService;
    this.ConfirmService = ConfirmService;
  }

  canLeave() {
    return this.UserService.user.id !== this.group.userId;
  }

  canDelete() {
    return this.UserService.user.id === this.group.userId;
  }

  deleteGroup() {
    this.ConfirmService.openModal(
      'Are you sure you want to delete this group?',
      'This action cannot be undone', 'Yes'
    ).then(() => {
      this.GroupService.deleteGroupById($ctrl.group._id);
    }).catch(() => {});
  }

  leaveGroup() {
    this.ConfirmService.openModal(
      'Are you sure you want to leave this group?',
      'This action cannot be undone', 'Yes'
    ).then(() => {
      this.GroupService.leaveGroup($ctrl.group._id);
    }).catch(() => {});
  }


}
GroupCardController.$inject = ['UserService', 'GroupService', 'ConfirmService'];

const GroupCardComponent = {
  restrict: 'E',
  bindings: {
    group: '<'
  },
  template: template,
  controller: GroupCardController
};

export default GroupCardComponent;
