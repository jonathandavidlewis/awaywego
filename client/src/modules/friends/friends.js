import angular from 'angular';

// imports for this module
import FriendsNavComponent from './friends-nav/friends-nav.js';
import FriendsListComponent from './friends-list/friends-list.js';
import FriendsAddComponent from './friends-add/friends-add.js';
import UserCardComponent from './user-card/user-card.js';

// imports for this component
import template from './friends.html';
import './friends.css';

class FriendsController {
  constructor() {}
}

const FriendsComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsController
};

const FriendsModule = angular.module('app.friends', [])
  .component('friends', FriendsComponent)
  .component('friendsNav', FriendsNavComponent)
  .component('friendsList', FriendsListComponent)
  .component('friendsAdd', FriendsAddComponent)
  .component('userCard', UserCardComponent);

export default FriendsModule.name;
