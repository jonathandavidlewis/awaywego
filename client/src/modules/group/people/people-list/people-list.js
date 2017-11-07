import angular from 'angular';

// imports for this component
import template from './people-list.html';
import './people-list.css';

class PeopleListController {
  constructor(GroupService, UserService) {
    this.GroupService = GroupService;
    this.UserService = UserService;
  }

}
PeopleListController.$inject = ['GroupService', 'UserService'];

const PeopleListComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleListController
};

export default PeopleListComponent;
