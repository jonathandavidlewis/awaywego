import angular from 'angular';

// imports for this component
import template from './friends-list.html';
import './friends-list.css';

class FriendsListController {
  constructor(FriendService, UserService, ConfirmService, $state) {
    this.$inject = ['FriendService', 'UserService', 'ConfirmService', '$state'];
    this.FriendService = FriendService;
    this.UserService = UserService;
    this.ConfirmService = ConfirmService;
    this.state = $state;

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

  $onInit() {
    if (this.UserService.isNewUser) {
      this.ConfirmService.openModal('This is the Friends page. If you\'ve just imported contacts, you can see pending requests below. When someone requests to add you as a friend, you\'ll see that here too! Once you are done managing your friend list, click \'continue\'', null, null, 'Skip Tour');
    }
  }

  continue() {
    this.UserService.isNewUser = false;
    window.localStorage.removeItem('new_user');
    this.state.go('app.home');
  }

}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
