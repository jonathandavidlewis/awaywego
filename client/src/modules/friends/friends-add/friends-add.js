import angular from 'angular';

// imports for this component
import template from './friends-add.html';
import './friends-add.css';

class FriendsAddController {
  constructor(FriendService) {
    this.$inject = ['FriendService'];
    this.FriendService = FriendService;
    this.email = '';

    this.searchStatus = '';
    this.frCard = null;

    this.searchForFriend = this.searchForFriend.bind(this);
  }

  resetResults() {
    this.frCard = null;
    this.searchStatus = '';
  }

  searchForFriend() {
    this.resetResults();
    const email = this.email; // store email in case user changes it!
    if (!email) { return; }
    const friend = this.FriendService.findFriend(email);

    if (friend.status === 'self') {
      this.searchStatus = 'self';
    } else if (friend.status === 'friends' ||
               friend.status === 'pending' ||
               friend.status === 'sent') {
      this.searchStatus = friend.status;
      this.frCard = friend.fr;
    } else {
      this.FriendService.findUserByEmail(email).then(user => {
        if (user) {
          this.searchStatus = 'foundUser';
          this.frCard = {_id: null, to: user};
        } else if (email) {
          this.searchStatus = 'invite';
          this.frCard = {_id: null, to: {email: email}};
        }
      });
    }
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
