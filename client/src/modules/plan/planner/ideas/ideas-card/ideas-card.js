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
<<<<<<< aa4c33d80d730dd1bf24c5bbbd36e7843992e90a
    event: '<'
=======
    idea: '<',
    deleteEvent: '<'
>>>>>>> Adds live events to idea page
  },
  template: template,
  controller: IdeasCardController
};


export default IdeasCardComponent;
