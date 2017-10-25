import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor() {
    this.planId = 'sample';
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handlePromoteClick = this.handlePromoteClick.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.event._id);
  }

  handlePromoteClick() {
    this.promoteEvent(this.event._id);
  }
}
IdeasCardController.$inject = [''];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    event: '<',
    deleteEvent: '<',
    promoteEvent: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
