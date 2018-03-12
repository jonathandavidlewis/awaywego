import angular from 'angular';

// imports for this component
import template from './privacy-policy.html';

class PrivPolicyController {
  constructor($state) {
    this.$state = $state;
  }

}
PrivPolicyController.$inject = ['$state'];

const PrivPolicyComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: PrivPolicyController
};

const PrivPolicyModule = angular.module('app.privacy', [])
  .component('privacy', PrivPolicyComponent);

export default PrivPolicyModule.name;
