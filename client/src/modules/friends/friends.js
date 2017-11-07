import angular from 'angular';

// imports for this module
import FriendsListComponent from './friends-list/friends-list.js';
import FriendsAddComponent from './friends-add/friends-add.js';
import FriendCardComponent from './friend-card/friend-card.js';

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
  .component('friendsList', FriendsListComponent)
  .component('friendsAdd', FriendsAddComponent)
  .component('friendCard', FriendCardComponent);

export default FriendsModule.name;
