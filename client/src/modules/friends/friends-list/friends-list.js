import angular from 'angular';

// imports for this component
import template from './friends-list.html';
import './friends-list.css';

class FriendsListController {
  constructor(FriendService) {
    this.$inject = ['FriendService'];
    this.FriendService = FriendService;

    // new friend form
    this.newFriendOpen = false;

    // callback bindings
    this.acceptFriend = this.acceptFriend.bind(this);
    this.rejectFriend = this.rejectFriend.bind(this);
    this.cancelFriend = this.cancelFriend.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  toggleForm($event) {
    $event.stopPropagation();
    this.newFriendOpen = !this.newFriendOpen;
  }

  closeForm() {
    this.newFriendOpen = false;
  }

  acceptFriend(frId) {
    this.FriendService.acceptFriendRequest(frId);
  }

  rejectFriend(frId) {
    this.FriendService.rejectFriendRequest(frId);
  }

  cancelFriend(frId) {
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
