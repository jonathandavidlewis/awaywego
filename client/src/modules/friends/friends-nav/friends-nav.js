import angular from 'angular';

// imports for this component
import template from './friends-nav.html';
import './friends-nav.css';

class FriendsNavController {
  constructor() {
  }
}

const FriendsNavComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsNavController
};

export default FriendsNavComponent;
