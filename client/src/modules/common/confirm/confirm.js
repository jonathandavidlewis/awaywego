import angular from 'angular';

// imports for this component
import template from './confirm.html';
import './confirm.css';

class ConfirmController {
  constructor(ConfirmService) {
    this.ConfirmService = ConfirmService;
  }
}
ConfirmController.$inject = ['ConfirmService'];

const ConfirmComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: ConfirmController
};

export default ConfirmComponent;
