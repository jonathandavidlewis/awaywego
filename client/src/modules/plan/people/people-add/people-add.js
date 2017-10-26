import angular from 'angular';
import _ from 'lodash';

// imports for this component
import template from './people-add.html';
import './people-add.css';

class PeopleAddController {
  constructor(PlanService, UserService, FriendService) {
    this.search = '';
    this.members = PlanService.currentPlan.members;
    console.log('Friendships: ', FriendService.friendships);
    this.friends = FriendService.friendships.map(fr => fr.to);
    this.availableFriends = this.getFriendsNotInGroup();
    console.log('Members: ', this.members);
    console.log('Friends: ', this.friends);
    console.log('Avail: ', this.availableFriends);
  }

  getFriendsNotInGroup() {
    return _.differenceBy(this.friends, this.members, a => a._id).map(friend => {
      return {user: friend, status: 'unchecked'};
    });
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
