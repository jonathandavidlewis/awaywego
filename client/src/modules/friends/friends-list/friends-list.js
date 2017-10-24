import angular from 'angular';

// imports for this component
import template from './friends-list.html';
import './friends-list.css';

class FriendsListController {
  constructor(FriendService) {
    this.$inject = ['FriendService'];
    this.FriendService = FriendService;
    this.friendships = this.FriendService.getFriendships();
    this.pendingFriendRequests = this.FriendService.getPendingFriendRequests();
    this.sentFriendRequests = this.FriendService.getSentRequests();
  }
}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
