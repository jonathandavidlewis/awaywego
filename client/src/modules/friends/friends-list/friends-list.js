import angular from 'angular';

// imports for this component
import template from './friends-list.html';
import './friends-list.css';

class FriendsListController {
  constructor(FriendService) {
    this.$inject = ['FriendService'];
    this.FriendService = FriendService;
    this.friendships = this.FriendService.getFriendships();
    this.inboundReqs = this.FriendService.getInboundReqs();
    this.sentReqs = this.FriendService.getSentReqs();

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
    let accI = this.inboundReqs.findIndex(el => el._id === frId);
    let accepted = this.inboundReqs.splice(accI, 1);
    accepted.status = 'accepted';
    this.friendships.push(accepted);
  }

  rejectFriendRequest(frId) {
    this.FriendService.rejectFriendRequest(frId);
  }

  cancelFriendRequest(frId) {
    this.FriendService.cancelFriendRequest(frId);
    let cancI = this.sentReqs.findIndex(el => el._id === frId);
    this.sentReqs.splice(cancI, 1);
  }
}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
