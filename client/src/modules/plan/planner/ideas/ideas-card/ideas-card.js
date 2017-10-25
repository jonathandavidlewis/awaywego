import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor($scope) {
    this.planId = 'sample';
    this.$scope = $scope;
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handlePromoteClick = this.handlePromoteClick.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.idea._id);
  }

  handlePromoteClick() {
    this.promoteEvent(this.idea._id);
  }
}
IdeasCardController.$inject = ['$scope'];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    idea: '<',
    deleteEvent: '<',
    promoteEvent: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
