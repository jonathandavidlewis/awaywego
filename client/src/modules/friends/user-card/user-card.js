import angular from 'angular';

// imports for this component
import template from './user-card.html';
import './user-card.css';

class UserCardController {
  constructor() {
  }
}

const UserCardComponent = {
  restrict: 'E',
  bindings: {
    user: '<'
  },
  template: template,
  controller: UserCardController
};

export default UserCardComponent;
