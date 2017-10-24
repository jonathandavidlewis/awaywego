import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor() {
    this.ideaId = 'sample';
  }
}
IdeasCardController.$inject = [];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
