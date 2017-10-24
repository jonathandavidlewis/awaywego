import angular from 'angular';

// imports for this component
import template from './friends-add.html';
import './friends-add.css';

class FriendsAddController {
  constructor(FriendService) {
    this.$inject = ['FriendService'];
    this.FriendService = FriendService;
    this.email = '';
    this.foundUser = null;
    this.inviteUser = null;

    this.requestFriend = this.requestFriend.bind(this);
    this.searchForFriend = this.searchForFriend.bind(this);
    this.inviteFriend = this.inviteFriend.bind(this);
  }

  resetResults() {
    this.foundUser = null;
    this.inviteUser = '';
  }

  searchForFriend() {
    this.resetResults();
    let email = this.email; // store email in case user changes it!
    this.FriendService.findFriendByEmail(this.email).then(user => {
      if (user) {
        this.foundUser = user;
      } else if (email) {
        this.inviteUser = {name: email};
      }
    });
  }

  requestFriend(friendId) {
    this.FriendService.newFriendRequest(friendId).then(resp => {
      this.FriendService.sentReqs.push(resp.data.newFr);
      this.resetResults();
      this.closeForm();
    });
  }

  inviteFriend(email) {
    this.FriendService.inviteFriend(email).then(resp => {
      let newFr = resp.data.newFr;
      newFr.to = {_id: null, name: newFr.toEmail};
      this.FriendService.sentReqs.push(newFr);
      this.resetResults();
      this.closeForm();
    });
  }

}

const FriendsAddComponent = {
  restrict: 'E',
  bindings: {
    closeForm: '<'
  },
  template: template,
  controller: FriendsAddController
};

export default FriendsAddComponent;
