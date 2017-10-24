import angular from 'angular';

// imports for this component
import template from './friends-list.html';
import './friends-list.css';

const ME = {_id: '1', name: 'Jared', email: 'jared@example.com'};
const TEST_FRIENDSHIPS = [
  {_id: '1123', from: ME, to: {_id: '123', name: 'Jim', email: 'jim@example.com' }},
  {_id: '4456', from: ME, to: {_id: '456', name: 'Bob', email: 'bob@example.com'}},
  {_id: '7789', from: ME, to: {_id: '789', name: 'Jill', email: 'jill@example.com'}}
];

const TEST_PEND_REQS = [
  {_id: 'p1', from: {_id: '987', name: 'Joe', email: 'joe@example.com'}, to: ME}
];

const TEST_SENT = [
  {_id: 's1', from: ME, to: {_id: '369', name: 'Pat', email: 'Pat@example.com'}}
];


class FriendsListController {
  constructor() {
    this.friendships = TEST_FRIENDSHIPS;
    this.pendingFriendRequests = TEST_PEND_REQS;
    this.sentFriendRequests = TEST_SENT;
  }
}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
