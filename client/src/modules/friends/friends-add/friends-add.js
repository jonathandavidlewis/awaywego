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
    this.inviteUser = '';

    this.requestFriend = this.requestFriend.bind(this);
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
      } else {
        this.inviteUser = email;
      }
    });
  }

  requestFriend(friendId) {
    this.FriendService.newFriendRequest(friendId).then(() => {
      this.resetResults();
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
