import angular from 'angular';

// imports for this component
import template from './people-card.html';
import './people-card.css';

class PeopleCardController {
  constructor() {
  }
}
PeopleCardController.$inject = [];

const PeopleCardComponent = {
  restrict: 'E',
  bindings: {
    type: '<',
    user: '<',
    owner: '<',
    self: '<',
    remove: '<',
    include: '<',
    exclude: '<'
  },
  template: template,
  controller: PeopleCardController
};

export default PeopleCardComponent;
