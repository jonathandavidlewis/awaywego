import angular from 'angular';

// imports for this component
import template from './friends-add.html';
import './friends-add.css';

class FriendsAddController {
  constructor() {}
}

const FriendsAddComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: FriendsAddController
};

export default FriendsAddComponent;
