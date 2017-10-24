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

    // callback bindings
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.rejectFriendRequest = this.rejectFriendRequest.bind(this);
    this.cancelFriendRequest = this.cancelFriendRequest.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  toggleForm() {
    this.newFriendOpen = !this.newFriendOpen;
  }

  closeForm() {
    this.newFriendOpen = false;
  }

  acceptFriendRequest(frId) {
    this.FriendService.acceptFriendRequest(frId);
    let accepted = this.pendingFriendRequests.findIndex(el => el._id === frId);
    accepted = this.pendingFriendRequests.splice(accepted, 1);
    accepted.status = 'accepted';
    this.friendships.push(accepted);
  }

  rejectFriendRequest(frId) {
    this.FriendService.rejectFriendRequest(frId);
  }

  cancelFriendRequest(frId) {
    this.FriendService.cancelFriendRequest(frId);
    let cancelled = this.sentFriendRequests.findIndex(el => el._id === frId);
    this.sentFriendRequests.splice(cancelled, 1);
  }
}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
