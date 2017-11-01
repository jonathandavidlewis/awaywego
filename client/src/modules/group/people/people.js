import angular from 'angular';

// services for this module
import GroupService from '../../../services/group/group.service';

// components for this module
import PeopleAddComponent from './people-add/people-add';
import PeopleCardComponent from './people-card/people-card';
import PeopleListComponent from './people-list/people-list';

// imports for this component
import template from './people.html';
import './people.css';

class PeopleController {
  constructor(GroupService) {
  }
}

const PeopleComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleController
};

const PeopleModule = angular.module('app.group.people', [])
  .component('people', PeopleComponent)
  .component('peopleList', PeopleListComponent)
  .component('peopleAdd', PeopleAddComponent)
  .component('peopleCard', PeopleCardComponent)
  .service('GroupService', GroupService);

export default PeopleModule.name;
