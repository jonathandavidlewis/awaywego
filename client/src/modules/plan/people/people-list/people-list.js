import angular from 'angular';

// imports for this component
import template from './people-list.html';
import './people-list.css';

class PeopleListController {
  constructor(PlanService, FriendService, UserService) {
    this.planOwner = PlanService.currentPlan.userId;
    this.planMembers = PlanService.currentPlan.members;
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
