import angular from 'angular';

// imports for this component
import template from './friend-card.html';
import './friend-card.css';

class FriendCardController {
  constructor(FriendService, ConfirmService) {
    this.FriendService = FriendService;
    this.ConfirmService = ConfirmService;
    this.busy = false;
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.cancel = this.cancel.bind(this);
    this.request = this.request.bind(this);
    this.invite = this.invite.bind(this);
  }

  $onInit() { // set a default 'action callback' to do nothing
    if (typeof this.actionCallback !== 'function') {
      this.actionCallback = function() {};
    }
  }

  accept() {
    this.busy = true;
    this.FriendService.acceptFriendRequest(this.frId).then(() => {
      this.type = 'import_invite';
      this.actionCallback();
    }).finally(() => this.busy = false);
  }

  reject() {
    this.ConfirmService.openModal(
      'Are you sure you want to reject this friend request?', '',
      'Yes', 'No'
    ).then(() => {
      this.busy = true;
      return this.FriendService.rejectFriendRequest(this.frId);
    })
      .then(() => this.actionCallback())
      .catch(() => {})
      .finally(() => this.busy = false);
  }

  cancel() {
    this.ConfirmService.openModal(
      'Are you sure you want to cancel this friend request?', '',
      'Yes', 'No'
    ).then(() => {
      this.busy = true;
      return this.FriendService.cancelFriendRequest(this.frId);
    })
      .then(() => this.actionCallback())
      .catch(() => {})
      .finally(() => this.busy = false);
  }

  request() {
    this.busy = true;
    this.FriendService.newFriendRequest(this.user._id).then(() => {
      this.type = 'import_invite';
      this.actionCallback();
    }).finally(() => this.busy = false);
  }

  invite() {
    this.busy = true;
    this.FriendService.inviteFriend(this.user.email).then(() => {
      this.type = 'import_invite';
      this.actionCallback();
    }).finally(() => this.busy = false);
  }

}
FriendCardController.$inject = ['FriendService', 'ConfirmService'];

/*
  Friend card has many types that determine look-and-feel, but uses
  the FriendService to own most of its own behavior
  all types require a user, note that for invited
  users (who have no 'name' yet), pass email in as name
  in the user object:
    user: {_id: null, name: a@a.com, email: ''}
  ------------------------------------
  pending: inbound friend request is pending
   inputs: frId
  sent: outbound friend request is pending
   inputs: frId
  friend:  person is already your friend
   inputs: none atm TODO: add a remove friend system
  request: person is user but not your friend
  invite: person is not user and not your friend
  self: person is you -> inputs: none
  -----
  actionCallback -> let's components using friend cards indicate some
  callback to be run upon completion of a friend-card action
*/

const FriendCardComponent = {
  restrict: 'E',
  bindings: {
    user: '<',
    type: '@',
    frId: '<',
    actionCallback: '<',
  },
  template: template,
  controller: FriendCardController
};

export default FriendCardComponent;
