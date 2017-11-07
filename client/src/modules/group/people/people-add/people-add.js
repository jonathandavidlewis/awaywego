import angular from 'angular';
import _ from 'lodash';

// imports for this component
import template from './people-add.html';
import './people-add.css';

class PeopleAddController {
  constructor(GroupService, FriendService, UserService, $state) {
    this.search = '';
    this.GroupService = GroupService;
    this.UserService = UserService;
    this.$state = $state;
    this.members = GroupService.currentGroup.members;
    this.friends = FriendService.friendships.map(fr => fr.to);
    this.availableFriends = this.getFriendsNotInGroup();
    this.busy = false;

    this.toggleSelect = this.toggleSelect.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.addToGroup = this.addToGroup.bind(this);
  }

  getFriendsNotInGroup() {
    return _.differenceBy(this.friends, this.members, a => a._id).map(friend => {
      return {user: friend, selected: false};
    });
  }

  toggleSelect(userId) {
    let friend = this.availableFriends.find(avail => avail.user._id === userId);
    friend.selected = !friend.selected;
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

  addToGroup() {
    let toAdd = this.availableFriends.reduce((res, fr) => {
      if (fr.selected) { res.push(fr.user._id); }
      return res;
    }, []);
    if (toAdd.length === 0) { return; }
    this.busy = true;
    this.GroupService.addMembersToCurrentGroup(toAdd).then(() => {
      this.$state.go('^.list');
    });
  }

}
PeopleAddController.$inject = ['GroupService', 'FriendService', 'UserService', '$state'];

const PeopleAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleAddController
};

export default PeopleAddComponent;
