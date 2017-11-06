import angular from 'angular';

// imports for this component
import template from './spinner-box.html';
import './spinner-box.css';

class SpinnerBoxController {
  constructor() {
  }
}

const SpinnerBoxComponent = {
  restrict: 'E',
  bindings: {
    busy: '<'
  },
  template: template,
  controller: SpinnerBoxController
};

export default SpinnerBoxComponent;
