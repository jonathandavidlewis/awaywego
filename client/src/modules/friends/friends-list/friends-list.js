import angular from 'angular';

// imports for this component
import template from './friends-list.html';
import './friends-list.css';

class FriendsListController {
  constructor(FriendService, UserService, ConfirmService) {
    this.$inject = ['FriendService', 'UserService', 'ConfirmService'];
    this.FriendService = FriendService;
    this.UserService = UserService;
    this.ConfirmService = ConfirmService;

    // new friend form
    this.newFriendOpen = false;

    // callback bindings
    this.closeForm = this.closeForm.bind(this);
  }

  toggleForm($event) {
    //debugger;
    $event.stopPropagation();
    console.log('clicked');
    //$event.preventDefault();
    this.newFriendOpen = !this.newFriendOpen;
  }

  clicked() {
    console.log('CLICKEDIT');
  }

  closeForm() {
    this.newFriendOpen = false;
  }

  $onInit() {
    if (this.UserService.isNewUser) {
      this.ConfirmService.openModal('This is the Friends page. If you\'ve just imported contacts, you can see pending requests below. When someone requests to add you as a friend, you\'ll see that here too! Once you are done managing your friend list, click \'continue\'', null, null, 'Skip Tour');
    }
  }

}

const FriendsListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsListController
};

export default FriendsListComponent;
