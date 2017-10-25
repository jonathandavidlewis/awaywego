import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor() {
    this.planId = 'sample';
  }
}
IdeasCardController.$inject = [];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    event: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
