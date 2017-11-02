import angular from 'angular';

// imports for this component
import template from './friend-card.html';
import './friend-card.css';

class FriendCardController {
  constructor() {
    this.handleInvite = this.handleInvite.bind(this);
  }

  handleInvite(email) {
    this.invite(email);
    this.type = "import_invite";
  }

}

/*
  Friend card has many types that determine behavior
  and also determine expected inputs
  all types require a user, note that for invited
  users (who have no 'name' yet), pass email in as name
  in the user object:
    user: {_id: null, name: a@a.com, email: ''}
  ------------------------------------
  pending: inbound friend request is pending
   inputs: accept and reject methods
  sent: outbound friend request is pending
   inputs: cancel method, frId
  friend:  person is already your friend
   inputs: none atm TODO: add a remove friend system
  request: person is user but not your friend
   inputs: request method to send friend request
  invite: person is not user and not your friend
   inputs: invite method to send invite
  self: person is you -> inputs: none
*/

const FriendCardComponent = {
  restrict: 'E',
  bindings: {
    user: '<',
    type: '@',
    frId: '<',
    accept: '<',
    reject: '<',
    cancel: '<',
    request: '<',
    invite: '<'
  },
  template: template,
  controller: FriendCardController
};

export default FriendCardComponent;
