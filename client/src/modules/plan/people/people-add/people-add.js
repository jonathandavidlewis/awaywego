import angular from 'angular';

// imports for this component
import template from './people-add.html';
import './people-add.css';

class PeopleAddController {
  constructor() {
  }
}
PeopleAddController.$inject = [];

const PeopleAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PeopleAddController
};

export default PeopleAddComponent;
