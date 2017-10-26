import angular from 'angular';

// imports for this component
import template from './people-card.html';
import './people-card.css';

class PeopleCardController {
  constructor() {
    this.handleContainerClick = this.handleContainerClick.bind(this);
  }

  handleContainerClick() {
    if (this.type === 'select') {
      this.toggle(this.user._id);
    }
  }

}
PeopleCardController.$inject = [];

const PeopleCardComponent = {
  restrict: 'E',
  bindings: {
    type: '@',
    user: '<',
    owner: '<',
    self: '<',
    remove: '<',
    toggle: '<',
    checked: '<'
  },
  template: template,
  controller: PeopleCardController
};

export default PeopleCardComponent;
