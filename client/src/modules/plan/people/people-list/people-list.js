import angular from 'angular';

// imports for this component
import template from './people-list.html';
import './people-list.css';

class PeopleListController {
  constructor(PlanService, FriendService, UserService) {
    this.PlanService = PlanService;
    this.UserService = UserService;
    this.planOwner = '';
    this.planMembers = [];
    this.refreshPlan();
    this.remove = this.remove.bind(this);
  }

  refreshPlan() {
    this.planOwner = this.PlanService.currentPlan.userId;
    this.planMembers = this.PlanService.currentPlan.members;
  }

  remove(userId) {
    this.PlanService.removeMemberFromCurrentPlan(userId)
      .then(() => this.refreshPlan());
  }

}
PeopleListController.$inject = ['PlanService', 'FriendService', 'UserService'];

const PeopleListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleListController
};

export default PeopleListComponent;
