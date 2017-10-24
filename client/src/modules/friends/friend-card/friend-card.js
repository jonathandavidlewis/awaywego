import angular from 'angular';

// imports for this component
import template from './friend-card.html';
import './friend-card.css';

class FriendCardController {
  constructor() {
  }
}

const FriendCardComponent = {
  restrict: 'E',
  bindings: {
    user: '<'
  },
  template: template,
  controller: FriendCardController
};

export default FriendCardComponent;
