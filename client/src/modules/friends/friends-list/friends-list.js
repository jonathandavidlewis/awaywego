import angular from 'angular';

// imports for this component
import template from './friends-list.html';
import './friends-list.css';

const TEST_USERS = [
  {_id: '123', name: 'Jim', email: 'jim@example.com'},
  {_id: '456', name: 'Bob', email: 'bob@example.com'},
  {_id: '789', name: 'Jill', email: 'jill@example.com'}
];


class FriendsListController {
  constructor() {
    this.friends = TEST_USERS;
  }
}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
