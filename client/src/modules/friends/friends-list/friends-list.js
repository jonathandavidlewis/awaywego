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
    this.closeForm = this.closeForm.bind(this);
  }

  toggleForm($event) {
    $event.stopPropagation();
    this.newFriendOpen = !this.newFriendOpen;
  }

  closeForm() {
    this.newFriendOpen = false;
  }
}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
