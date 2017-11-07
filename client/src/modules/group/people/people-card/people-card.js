import angular from 'angular';

// imports for this component
import template from './people-card.html';
import './people-card.css';

class PeopleCardController {
  constructor(GroupService, ConfirmService) {
    this.GroupService = GroupService;
    this.ConfirmService = ConfirmService;
  }

  remove() {
    this.ConfirmService.openModal(
      'Are you sure you want to remove this user from the group?',
      'This action cannot be undone', 'Yes'
    ) .then(() => {
      this.busy = true;
      this.GroupService.removeMemberFromCurrentGroup(this.member._id)
        .finally(() => this.busy = false);
    }).catch(() => {});
  }

  canRemoveOrSelect() {
    return this.ownerId === this.user.id && this.member._id !== this.user.id;
  }
}
PeopleCardController.$inject = ['GroupService', 'ConfirmService'];

/* Bindings overview
  type: select -> indicates card can be selected (for adding people to a group)
        null -> card in list mode, can remove if member !== user && user === admin or higher
  member: the member object represented by the current card
  owner: the group owner's id
  user: the current user's id
  selected: in a select sitaution, identifies if 'selected' or not
*/

const PeopleCardComponent = {
  restrict: 'E',
  bindings: {
    type: '@',
    member: '<',
    ownerId: '<',
    user: '<',
    selected: '<'
  },
  template: template,
  controller: PeopleCardController
};

export default PeopleCardComponent;
