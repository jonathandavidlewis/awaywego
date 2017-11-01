import angular from 'angular';

// imports for this component
import template from './group-card.html';
import './group-card.css';

class GroupCardController {
  constructor(UserService) {
    this.UserService = UserService;
  }
}

const GroupCardComponent = {
  restrict: 'E',
  bindings: {
    group: '<',
    deleteGroup: '<'
  },
  template: template,
  controller: GroupCardController
};

export default GroupCardComponent;
