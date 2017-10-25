import angular from 'angular';

// imports for this component
import template from './ideas-card.html';
import './ideas-card.css';

class IdeasCardController {
  constructor($scope) {
    this.planId = 'sample';
    this.$scope = $scope;
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    this.deleteEvent(this.idea._id);
  }
}
IdeasCardController.$inject = ['$scope'];

const IdeasCardComponent = {
  restrict: 'E',
  bindings: {
    idea: '<',
    deleteEvent: '<'
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
