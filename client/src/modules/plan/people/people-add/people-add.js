import angular from 'angular';
import _ from 'lodash';

// imports for this component
import template from './people-add.html';
import './people-add.css';

class PeopleAddController {
  constructor(PlanService, UserService, FriendService) {
    this.search = '';
    this.members = PlanService.currentPlan.members;
    this.friends = FriendService.friendships.map(fr => fr.to);
    this.availableFriends = this.getFriendsNotInGroup();
    console.log(this.availableFriends);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
  }

  getFriendsNotInGroup() {
    return _.differenceBy(this.friends, this.members, a => a._id).map(friend => {
      return {user: friend, checked: false};
    });
  }

  toggleSelect(userId) {
    let friend = this.availableFriends.find(avail => avail.user._id === userId);
    friend.status = !friend.status;
  }

  filterFriends(val) {
    if (this.search) {
      let s = this.search.toLowerCase();
      return (val.user.name.toLowerCase().includes(s) ||
              val.user.email.toLowerCase().includes(s));
    } else {
      return true;
    }
  }

}
PeopleAddController.$inject = ['PlanService', 'UserService', 'FriendService'];

const PeopleAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleAddController
};

export default PeopleAddComponent;
