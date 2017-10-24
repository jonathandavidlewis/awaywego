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

    // new friend form
    this.newFriendOpen = false;
    this.newFriendEmail = '';

    // callback bindings
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.rejectFriendRequest = this.rejectFriendRequest.bind(this);
    this.cancelFriendRequest = this.cancelFriendRequest.bind(this);
  }

  toggleForm() {
    this.newFriendOpen = !this.newFriendOpen;
  }

  acceptFriendRequest(frId) {
    this.FriendService.acceptFriendRequest(frId);
  }

  rejectFriendRequest(frId) {
    this.FriendService.rejectFriendRequest(frId);
  }

  cancelFriendRequest(frId) {
    this.FriendService.cancelFriendRequest(frId);
  }
}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
