import angular from 'angular';

// imports for this component
import template from './group-nav.html';
import './group-nav.css';

class GroupNavController {
  constructor($state) {
    this.$state = $state;
  }
}
GroupNavController.$inject = ['$state'];

const GroupNavComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: GroupNavController
};


export default GroupNavComponent;
